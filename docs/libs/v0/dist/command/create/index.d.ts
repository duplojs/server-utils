import { type Kind, type MaybePromise, type AnyTuple, type IsEqual } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";
import type { Option } from "../options";
import { SymbolCommandError, type CommandError } from "../error";
import { type ComputeSubject, type Subject } from "./subject";
export type { Subject } from "./subject";
declare const commandKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command", unknown>>;
export declare function isCommand(input: unknown): input is Command | AnyTuple<Command>;
export type CommandChildren = {
    type: "subCommand";
    subCommands: readonly Command[];
} | {
    type: "subject";
    subject: Subject;
    dataParser: DDP.DataParser;
};
export interface Command extends Kind<typeof commandKind.definition> {
    readonly name: string;
    readonly description: string | null;
    readonly children: CommandChildren | null;
    readonly options: readonly Option[];
    execute(args: readonly string[], error: CommandError): Promise<undefined | SymbolCommandError>;
}
export interface CreateCommandParams<GenericOptions extends readonly Option[] = readonly [], GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined> {
    description?: string;
    options?: GenericOptions;
    subject?: GenericSubject;
}
export type CreateCommandExecuteParams<GenericOptions extends readonly Option[] = readonly [], GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined> = ((IsEqual<GenericOptions[number], never> extends true ? {} : {
    options: {
        [GenericOption in GenericOptions[number] as GenericOption["name"]]: Exclude<Awaited<ReturnType<GenericOption["execute"]>>, SymbolCommandError>["result"];
    };
}) & ([
    GenericSubject
] extends [Subject] ? {
    subject: ComputeSubject<GenericSubject>;
} : {}));
/**
 * Create a command node.
 * 
 * Use this builder to define a command name, optional options, an optional subject, and the execute handler called after parsing.
 * 
 * ```ts
 * const ping = SC.create(
 * 	"ping",
 * 	() => {
 * 		// run ping action
 * 	},
 * );
 * 
 * const UserId = C.createNewType("user-id", DP.number(), C.Positive);
 * 
 * const greet = SC.create(
 * 	"greet",
 * 	{
 * 		options: [SC.createOption("email", C.Email)],
 * 		subject: UserId,
 * 	},
 * 	({ options: { email }, subject }) => {
 * 		// email: C.Email | undefined
 * 		// subject: C.GetNewType<typeof UserId>
 * 	},
 * );
 * 
 * const projectCreate = SC.create(
 * 	"create",
 * 	() => {
 * 		// create project
 * 	},
 * );
 * 
 * const project = SC.create(
 * 	"project",
 * 	{
 * 		subject: [projectCreate],
 * 	},
 * 	() => {
 * 		// parent command fallback
 * 	},
 * );
 * ```
 * 
 * @remarks
 * `subject` can be a parser-like contract for positional arguments, or an array of child commands for nested command trees.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/create
 * @namespace SC
 * 
 */
export declare function create(name: string, execute: () => void): Command;
export declare function create<GenericOptions extends readonly Option[] = readonly [], GenericSubject extends Subject | Command | AnyTuple<Command> | undefined = undefined>(name: string, params: CreateCommandParams<GenericOptions, GenericSubject>, execute: (params: CreateCommandExecuteParams<GenericOptions, GenericSubject>) => MaybePromise<void>): Command;
