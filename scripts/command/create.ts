import { type SimplifyTopLevel, type Kind, type AnyFunction, type RemoveKind, A, DP, type MaybePromise, O } from "@duplojs/utils";
import { createBooleanOption, type Option } from "./options";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import type { EligibleDataParser } from "./types";
import { exitProcess } from "@scripts/common";
import { logHelp } from "./help";
import { CommandManyArgumentsError } from "./errors";

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

const commandKind = createDuplojsServerUtilsKind("command");

const helpOption = createBooleanOption("help", { aliases: ["h"] });

export interface Command extends Kind<
	typeof commandKind.definition
> {
	readonly name: string;
	readonly description: string | null;
	readonly subject: Subject | null | readonly Command[];
	readonly options: readonly Option[];
	execute(args: readonly string[]): MaybePromise<void>;
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
		[GenericOptionName in GenericOptions[number]["name"]]: ReturnType<
			Extract<
				GenericOptions[number],
				{ name: GenericOptionName }
			>["execute"]
		>["result"]
	};
	subject?: DP.Output<GenericSubject>;
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
			execute: async(args: readonly string[]) => {
				if (self.subject instanceof Array) {
					for (const command of self.subject) {
						if (args[0] === command.name) {
							await command.execute(A.shift(args));

							return;
						}
					}
				}

				const help = helpOption.execute(args);

				if (help.result) {
					logHelp(self);
					exitProcess(0);

					return;
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
					({ element: option, lastValue, next }) => {
						const optionResult = option.execute(lastValue.restArgs);

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

				if (self.subject === null) {
					await execute({ options: commandOptions.options });
				} else if (
					DP.identifier(self.subject, DP.arrayKind)
					|| DP.identifier(self.subject, DP.tupleKind)
				) {
					await execute({
						options: commandOptions.options,
						subject: self.subject.parseOrThrow(commandOptions.restArgs),
					});
				} else if (DP.identifier(self.subject, DP.dataParserKind)) {
					if (commandOptions.restArgs.length !== 1) {
						throw new CommandManyArgumentsError(commandOptions.restArgs.length);
					}

					await execute({
						options: commandOptions.options,
						subject: self.subject.parseOrThrow(commandOptions.restArgs),
					});
				} else {
					await execute({});
				}
				exitProcess(0);

				return;
			},
		} satisfies RemoveKind<Command>,
	);

	return self;
}
