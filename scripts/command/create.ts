import { type SimplifyTopLevel, type Kind, type AnyFunction, type RemoveKind, A, DP, E, unwrap, type MaybePromise, O } from "@duplojs/utils";
import { createBooleanOption, type Option } from "./options";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import type { EligibleDataParser } from "./types";
import { exitProcess } from "@scripts/common/exitProcess";
import { addIssue, addDataParserError, createError, interpretError, popErrorPath, setErrorPath, SymbolCommandError, type CommandError } from "./error";
import { logHelp } from "./help";

export type Subject = (
	| EligibleDataParser
	| DP.DataParserArray<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionArray, "element">
			& {
				readonly element: EligibleDataParser;
			}
		>
	>
	| DP.AdvancedContract<
		DP.DataParserTuple<
			SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionTuple, "shape" | "rest">
			& {
				readonly shape: readonly [
					EligibleDataParser,
					...EligibleDataParser[],
				];
				readonly rest: EligibleDataParser | undefined;
			}
			>
		>
	>
);

function printError(commandError: CommandError, error?: CommandError): SymbolCommandError {
	if (!error) {
		// eslint-disable-next-line no-console
		console.error(interpretError(commandError));
		exitProcess(1);
	}

	return SymbolCommandError;
}

const commandKind = createDuplojsServerUtilsKind("command");

const helpOption = createBooleanOption("help", { aliases: ["h"] });

export interface Command extends Kind<
	typeof commandKind.definition
> {
	readonly name: string;
	readonly description: string | null;
	readonly subject: Subject | null | readonly Command[];
	readonly options: readonly Option[];
	execute(args: readonly string[], error?: CommandError): Promise<undefined | SymbolCommandError>;
}

export interface CreateCommandParams<
	GenericOptions extends readonly Option[] = [],
	GenericSubject extends Subject = Subject,
> {
	description?: string;
	options?: GenericOptions;
	subject?: GenericSubject | readonly Command[];
}

export interface CreateCommandExecuteParams<
	GenericOptions extends readonly Option[],
	GenericSubject extends Subject,
> {
	options: {
		[GenericOptionName in GenericOptions[number]["name"]]: Exclude<
			ReturnType<
				Extract<
					GenericOptions[number],
					{ name: GenericOptionName }
				>["execute"]
			>,
			SymbolCommandError
		>["result"]
	};
	subject: DP.Output<GenericSubject>;
}

/**
 * {@include command/create/index.md}
 */
export function create(
	name: string,
	execute: () => void,
): Command;

export function create<
	GenericOptions extends readonly Option[],
	GenericSubject extends Subject,
>(
	name: string,
	params: CreateCommandParams<
		GenericOptions,
		GenericSubject
	>,
	execute: (
		params: CreateCommandExecuteParams<GenericOptions, GenericSubject>,
	) => MaybePromise<void>,
): Command;

export function create(
	...args: [string, AnyFunction] | [string, CreateCommandParams, AnyFunction]
): Command {
	const [name, params, execute] = args.length === 2
		? [args[0], {}, args[1]]
		: args;

	const self: Command = commandKind.setTo(
		{
			name,
			description: params.description ?? null,
			options: params.options ?? [],
			subject: params.subject ?? null,
			execute: async(args, error?) => {
				const commandError = error ?? createError(self.name);
				const pathIndex = commandError.currentCommandPath.length;

				if (self.subject instanceof Array) {
					for (const command of self.subject) {
						if (args[0] === command.name) {
							let result: Awaited<ReturnType<typeof command.execute>> | undefined = undefined;

							setErrorPath(commandError, command.name, pathIndex);
							try {
								result = await command.execute(A.shift(args), commandError);
							} finally {
								popErrorPath(commandError);
							}

							if (result === SymbolCommandError) {
								return printError(commandError, error);
							}

							return result;
						}
					}
				}

				const help = helpOption.execute(args, commandError);

				if (help === SymbolCommandError) {
					return printError(commandError, error);
				} else if (help.result) {
					logHelp(self);
					return void exitProcess(0);
				}

				const commandOptions = A.reduce(
					self.options,
					A.reduceFrom<{
						options: Record<string, unknown>;
						restArgs: readonly string[];
					}>({
						options: {},
						restArgs: args,
					}),
					({ element: option, lastValue, next, exit }) => {
						const optionResult = option.execute(lastValue.restArgs, commandError);

						if (optionResult === SymbolCommandError) {
							return exit(SymbolCommandError);
						}

						return next({
							options: O.override(
								lastValue.options,
								{
									[option.name]: optionResult.result,
								},
							),
							restArgs: optionResult.argumentRest,
						});
					},
				);

				if (commandOptions === SymbolCommandError) {
					return printError(commandError, error);
				}

				if (self.subject === null) {
					await execute({ options: commandOptions.options });
				} else if (
					DP.identifier(self.subject, DP.arrayKind)
					|| DP.identifier(self.subject, DP.tupleKind)
				) {
					const subjectResult = self.subject.parse(commandOptions.restArgs);

					if (E.isLeft(subjectResult)) {
						addDataParserError(
							commandError,
							unwrap(subjectResult),
							{
								type: "subject",
							},
						);

						return printError(commandError, error);
					}

					await execute({
						options: commandOptions.options,
						subject: unwrap(subjectResult),
					});
				} else if (DP.identifier(self.subject, DP.dataParserKind)) {
					if (commandOptions.restArgs.length > 1) {
						addIssue(
							commandError,
							{
								type: "command",
								expected: "exactly one subject argument",
								received: commandOptions.restArgs,
								message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
							},
						);

						return printError(commandError, error);
					}

					const subjectResult = self.subject.parse(commandOptions.restArgs);

					if (E.isLeft(subjectResult)) {
						addDataParserError(
							commandError,
							unwrap(subjectResult),
							{
								type: "subject",
							},
						);

						return printError(commandError, error);
					}

					await execute({
						options: commandOptions.options,
						subject: unwrap(subjectResult),
					});
				} else {
					await execute({});
				}

				return void exitProcess(0);
			},
		} satisfies RemoveKind<Command>,
	);

	return self;
}
