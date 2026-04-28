import { type SimplifyTopLevel, type Kind, type MaybePromise, type AnyTuple } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import { type Option } from "./options";
import type { EligibleCleanType, EligibleDataParser, ComputeEligibleCleanType } from "./types";
import { SymbolCommandError, type CommandError } from "./error";
export type Subject = (EligibleDataParser | EligibleCleanType | DDP.DataParserArray<SimplifyTopLevel<Omit<DDP.DataParserDefinitionArray, "element"> & {
    readonly element: EligibleDataParser;
}>> | DDP.AdvancedContract<DDP.DataParserTuple<SimplifyTopLevel<Omit<DDP.DataParserDefinitionTuple, "shape" | "rest"> & {
    readonly shape: readonly [
        EligibleDataParser,
        ...EligibleDataParser[]
    ];
    readonly rest: EligibleDataParser | undefined;
}>>> | AnyTuple<EligibleCleanType>);
type ComputeSubject<GenericSubject extends Subject> = [GenericSubject] extends [AnyTuple<EligibleCleanType>] ? {
    [GenericKey in keyof GenericSubject]: GenericSubject[GenericKey] extends EligibleCleanType ? ComputeEligibleCleanType<GenericSubject[GenericKey]> : never;
} : [GenericSubject] extends [DDP.DataParser] ? DDP.Output<GenericSubject> : [GenericSubject] extends [EligibleCleanType] ? ComputeEligibleCleanType<GenericSubject> : never;
declare const commandKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command", unknown>>;
export interface Command extends Kind<typeof commandKind.definition> {
    readonly name: string;
    readonly description: string | null;
    readonly subject: Subject | null | AnyTuple<Command>;
    readonly options: readonly Option[];
    execute(args: readonly string[], error: CommandError): Promise<undefined | SymbolCommandError>;
}
export interface CreateCommandParams<GenericOptions extends readonly Option[] = [], GenericSubject extends Subject = Subject> {
    description?: string;
    options?: GenericOptions;
    subject?: GenericSubject | AnyTuple<Command>;
}
export interface CreateCommandExecuteParams<GenericOptions extends readonly Option[], GenericSubject extends Subject> {
    options: {
        [GenericOptionName in GenericOptions[number]["name"]]: Exclude<Awaited<ReturnType<Extract<GenericOptions[number], {
            name: GenericOptionName;
        }>["execute"]>>, SymbolCommandError>["result"];
    };
    subject: ComputeSubject<GenericSubject>;
}
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
export declare function create<GenericOptions extends readonly Option[], GenericSubject extends Subject>(name: string, params: CreateCommandParams<GenericOptions, GenericSubject>, execute: (params: CreateCommandExecuteParams<GenericOptions, GenericSubject>) => MaybePromise<void>): Command;
export {};
