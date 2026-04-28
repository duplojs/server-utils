import { hasSomeKinds, type SimplifyTopLevel, type Kind, type AnyFunction, type RemoveKind, unwrap, type MaybePromise, type AnyTuple } from "@duplojs/utils";
import * as AA from "@duplojs/utils/array";
import * as GG from "@duplojs/utils/generator";
import * as OO from "@duplojs/utils/object";
import * as DDP from "@duplojs/utils/dataParser";
import * as EE from "@duplojs/utils/either";
import * as CC from "@duplojs/utils/clean";
import * as SDP from "@scripts/dataParser";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { createBooleanOption, type Option } from "./options";
import type { EligibleCleanType, EligibleDataParser, ComputeEligibleCleanType } from "./types";
import { exitProcess } from "@scripts/common/exitProcess";
import { addIssue, addIssueDataParser, SymbolCommandError, type CommandError } from "./error";
import { logCommandHelp } from "./help";

export type Subject = (
	| EligibleDataParser
	| EligibleCleanType
	| DDP.DataParserArray<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionArray, "element">
			& {
				readonly element: EligibleDataParser;
			}
		>
	>
	| DDP.AdvancedContract<
		DDP.DataParserTuple<
			SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionTuple, "shape" | "rest">
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
	| AnyTuple<EligibleCleanType>
);

type ComputeSubject<
	GenericSubject extends Subject,
> = [GenericSubject] extends [AnyTuple<EligibleCleanType>]
	? {
		[GenericKey in keyof GenericSubject]: GenericSubject[GenericKey] extends EligibleCleanType
			? ComputeEligibleCleanType<GenericSubject[GenericKey]>
			: never;
	}
	: [GenericSubject] extends [DDP.DataParser]
		? DDP.Output<GenericSubject>
		: [GenericSubject] extends [EligibleCleanType]
			? ComputeEligibleCleanType<GenericSubject>
			: never;

const commandKind = createDuplojsServerUtilsKind("command");

/**
 * @internal
 */
export function isCommands(subject: unknown): subject is AnyTuple<Command> {
	return subject instanceof Array
		&& subject.length >= 1
		&& AA.every(subject, commandKind.has);
}

function commandSubjectToDataParser(contract: Subject): DDP.DataParser {
	if (contract instanceof Array) {
		return DDP.tuple(
			AA.map(
				contract,
				(part) => commandSubjectToDataParser(part),
			) as [DDP.DataParser, ...DDP.DataParser[]],
		);
	}

	if (
		hasSomeKinds(contract, [
			DDP.stringKind,
			DDP.numberKind,
			DDP.bigIntKind,
			DDP.dateKind,
			DDP.timeKind,
			DDP.nilKind,
			SDP.fileKind,
		])
	) {
		const clone = contract.clone();

		(clone.definition.coerce as any) = true;

		return clone;
	}

	if (DDP.identifier(contract, DDP.arrayKind)) {
		return DDP.array(
			commandSubjectToDataParser(contract.definition.element),
			contract.definition,
		);
	}

	if (DDP.identifier(contract, DDP.tupleKind)) {
		return DDP.tuple(
			contract.definition.shape.map(
				(part) => commandSubjectToDataParser(part),
			) as [DDP.DataParser, ...DDP.DataParser[]],
			{
				...contract.definition,
				rest: contract.definition.rest
					? commandSubjectToDataParser(contract.definition.rest)
					: undefined,
			},
		);
	}

	if (DDP.identifier(contract, DDP.dataParserKind)) {
		return contract;
	}

	return (
		CC.toMapDataParser as (
			innerContract: unknown,
			params?: {
				coerce?: boolean;
			},
		) => DDP.Contract<unknown, unknown>
	)(
		contract,
		{ coerce: true },
	);
}

const helpOption = createBooleanOption("help", { aliases: ["h"] });

export interface Command extends Kind<
	typeof commandKind.definition
> {
	readonly name: string;
	readonly description: string | null;
	readonly subject: Subject | null | AnyTuple<Command>;
	readonly options: readonly Option[];
	execute(args: readonly string[], error: CommandError): Promise<undefined | SymbolCommandError>;
}

export interface CreateCommandParams<
	GenericOptions extends readonly Option[] = [],
	GenericSubject extends Subject = Subject,
> {
	description?: string;
	options?: GenericOptions;
	subject?: GenericSubject | AnyTuple<Command>;
}

export interface CreateCommandExecuteParams<
	GenericOptions extends readonly Option[],
	GenericSubject extends Subject,
> {
	options: {
		[GenericOptionName in GenericOptions[number]["name"]]: Exclude<
			Awaited<ReturnType<
				Extract<
					GenericOptions[number],
					{ name: GenericOptionName }
				>["execute"]
			>>,
			SymbolCommandError
		>["result"]
	};
	subject: ComputeSubject<GenericSubject>;
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

	const subject = (
		params.subject
		&& !isCommands(params.subject)
			? commandSubjectToDataParser(params.subject)
			: params.subject
	) ?? null;

	const self: Command = commandKind.setTo(
		{
			name,
			description: params.description ?? null,
			options: params.options ?? [],
			subject: subject as Command["subject"],
			execute: async(args, error) => {
				const commandError = error;
				const pathIndex = commandError.currentCommandPath.length;

				if (isCommands(self.subject)) {
					for (const command of self.subject) {
						if (args[0] === command.name) {
							commandError.currentCommandPath[pathIndex] = command.name;
							return command.execute(AA.shift(args), commandError);
						}
					}
				}

				const help = await helpOption.execute(args, commandError);

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
						const optionResult = await option.execute(lastValue.restArgs, commandError);

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

				if (self.subject === null) {
					await execute({ options: commandOptions.options });
				} else if (
					DDP.identifier(self.subject, DDP.arrayKind)
					|| DDP.identifier(self.subject, DDP.tupleKind)
				) {
					const subjectResult = self.subject.isAsynchronous()
						? await self.subject.asyncParse(commandOptions.restArgs)
						: self.subject.parse(commandOptions.restArgs);

					if (EE.isLeft(subjectResult)) {
						addIssueDataParser(
							commandError,
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
				} else if (DDP.identifier(self.subject, DDP.dataParserKind)) {
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

						return SymbolCommandError;
					}

					const subjectResult = self.subject.isAsynchronous()
						? await self.subject.asyncParse(commandOptions.restArgs[0])
						: self.subject.parse(commandOptions.restArgs[0]);

					if (EE.isLeft(subjectResult)) {
						addIssueDataParser(
							commandError,
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
					await execute({});
				}

				return void exitProcess(0);
			},
		} satisfies RemoveKind<Command>,
	);

	return self;
}
