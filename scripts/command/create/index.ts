import { type Kind, type AnyFunction, type RemoveKind, unwrap, type MaybePromise, type AnyTuple, justExec, type IsEqual } from "@duplojs/utils";
import * as AA from "@duplojs/utils/array";
import * as GG from "@duplojs/utils/generator";
import * as OO from "@duplojs/utils/object";
import * as EE from "@duplojs/utils/either";
import type * as DDP from "@duplojs/utils/dataParser";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { exitProcess } from "@scripts/common/exitProcess";
import type { Option } from "../options";
import { addIssue, addIssueDataParser, SymbolCommandError, type CommandError } from "../error";
import { logCommandHelp, helpOption } from "../help";
import { isMultiSubject, subjectToDataParser, type ComputeSubject, type Subject } from "./subject";

export type { Subject } from "./subject";

const commandKind = createDuplojsServerUtilsKind("command");

export function isCommand(input: unknown): input is Command | AnyTuple<Command> {
	return input instanceof Array
		? input.every(commandKind.has)
		: commandKind.has(input);
}

export type CommandChildren = {
	type: "subCommand";
	subCommands: readonly Command[];
} | {
	type: "subject";
	subject: Subject;
	dataParser: DDP.DataParser;
};

export interface Command extends Kind<
	typeof commandKind.definition
> {
	readonly name: string;
	readonly description: string | null;
	readonly children: CommandChildren | null;
	readonly options: readonly Option[];
	execute(args: readonly string[], error: CommandError): Promise<undefined | SymbolCommandError>;
}

export interface CreateCommandParams<
	GenericOptions extends readonly Option[] = readonly [],
	GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined,
> {
	description?: string;
	options?: GenericOptions;
	subject?: GenericSubject;
}

export type CreateCommandExecuteParams<
	GenericOptions extends readonly Option[] = readonly [],
	GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined,
> = (
	& (
		IsEqual<GenericOptions[number], never> extends true
			? {}
			: {
				options: {
					[GenericOption in GenericOptions[number] as GenericOption["name"]]: Exclude<
						Awaited<ReturnType<
							GenericOption["execute"]
						>>,
						SymbolCommandError
					>["result"]
				};
			}
	)
	& (
		[GenericSubject] extends [Subject]
			? {
				subject: ComputeSubject<GenericSubject>;
			}
			: {}
	)
);

/**
 * {@include command/create/index.md}
 */
export function create(
	name: string,
	execute: () => void,
): Command;

export function create<
	GenericOptions extends readonly Option[] = readonly [],
	GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined,
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
			children: justExec((): CommandChildren | null => {
				if (isCommand(params.subject)) {
					return {
						type: "subCommand",
						subCommands: AA.coalescing(params.subject),
					};
				} else if (params.subject) {
					return {
						type: "subject",
						subject: params.subject,
						dataParser: subjectToDataParser(params.subject),
					};
				}

				return null;
			}),
			execute: async(args, error) => {
				if (self.children?.type === "subCommand") {
					for (const command of self.children.subCommands) {
						if (args[0] === command.name) {
							error.currentCommandPath[
								error.currentCommandPath.length
							] = command.name;
							return command.execute(AA.shift(args), error);
						}
					}
				}

				const help = await helpOption.execute(args, error);

				if (help === SymbolCommandError) {
					return SymbolCommandError;
				} else if (help.result) {
					logCommandHelp(self);
					return void exitProcess(0);
				}

				const commandOptions = await GG.asyncReduce(
					self.options,
					GG.reduceFrom<{
						options: Record<string, unknown>;
						restArgs: readonly string[];
					}>({
						options: {},
						restArgs: args,
					}),
					async({ element: option, lastValue, next, exit }) => {
						const optionResult = await option.execute(lastValue.restArgs, error);

						if (optionResult === SymbolCommandError) {
							return exit(SymbolCommandError);
						}

						return next({
							options: OO.override(
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
					return SymbolCommandError;
				}

				if (self.children?.type === "subject") {
					const hasMultiSubject = isMultiSubject(self.children.subject);

					if (
						!hasMultiSubject
						&& commandOptions.restArgs.length > 1
					) {
						addIssue(
							error,
							{
								type: "command",
								expected: "exactly one subject argument",
								received: commandOptions.restArgs,
								message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
							},
						);

						return SymbolCommandError;
					}

					const subjectInput = hasMultiSubject
						? commandOptions.restArgs
						: commandOptions.restArgs[0];

					const subjectResult = self.children.dataParser.isAsynchronous()
						? await self.children.dataParser.asyncParse(subjectInput)
						: self.children.dataParser.parse(subjectInput);

					if (EE.isLeft(subjectResult)) {
						addIssueDataParser(
							error,
							unwrap(subjectResult),
							{
								type: "subject",
							},
						);

						return SymbolCommandError;
					}

					await execute({
						options: commandOptions.options,
						subject: unwrap(subjectResult),
					});
				} else {
					if (commandOptions.restArgs.length > 0) {
						addIssue(
							error,
							{
								type: "command",
								expected: "existing child command",
								received: commandOptions.restArgs[0],
								message: `Unknown child command "${commandOptions.restArgs[0]}".`,
							},
						);
						return SymbolCommandError;
					}

					await execute({ options: commandOptions.options });
				}

				return void exitProcess(0);
			},
		} satisfies RemoveKind<Command>,
	);

	return self;
}
