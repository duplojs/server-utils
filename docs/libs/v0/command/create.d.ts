import { type SimplifyTopLevel, type Kind, type MaybePromise } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import { type Option } from "./options";
import type { EligibleDataParser } from "./types";
import { SymbolCommandError, type CommandError } from "./error";
export type Subject = (EligibleDataParser | DDP.DataParserArray<SimplifyTopLevel<Omit<DDP.DataParserDefinitionArray, "element"> & {
    readonly element: EligibleDataParser;
}>> | DDP.AdvancedContract<DDP.DataParserTuple<SimplifyTopLevel<Omit<DDP.DataParserDefinitionTuple, "shape" | "rest"> & {
    readonly shape: readonly [
        EligibleDataParser,
        ...EligibleDataParser[]
    ];
    readonly rest: EligibleDataParser | undefined;
}>>>);
declare const commandKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command", unknown>>;
export interface Command extends Kind<typeof commandKind.definition> {
    readonly name: string;
    readonly description: string | null;
    readonly subject: Subject | null | readonly Command[];
    readonly options: readonly Option[];
    execute(args: readonly string[], error?: CommandError): Promise<undefined | SymbolCommandError>;
}
export interface CreateCommandParams<GenericOptions extends readonly Option[] = [], GenericSubject extends Subject = Subject> {
    description?: string;
    options?: GenericOptions;
    subject?: GenericSubject | readonly Command[];
}
export interface CreateCommandExecuteParams<GenericOptions extends readonly Option[], GenericSubject extends Subject> {
    options: {
        [GenericOptionName in GenericOptions[number]["name"]]: Exclude<ReturnType<Extract<GenericOptions[number], {
            name: GenericOptionName;
        }>["execute"]>, SymbolCommandError>["result"];
    };
    subject: DDP.Output<GenericSubject>;
}
/**
 * Create a command node.
 * 
 * Use this builder to define a command name, its optional options/subject, and the execute handler called after parsing.
 * 
 * ```ts
 * const ping = SC.create(
 * 	"ping",
 * 	() => {
 * 		// run ping action
 * 	},
 * );
 * 
 * const greet = SC.create(
 * 	"greet",
 * 	{
 * 		options: [SC.createOption("name", DP.string(), { required: true })],
 * 	},
 * 	({ options: { name } }) => {
 * 		// name: string
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
 * `create` supports child commands by setting `subject` to an array of commands.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/create
 * @namespace SC
 * 
 */
export declare function create(name: string, execute: () => void): Command;
export declare function create<GenericOptions extends readonly Option[], GenericSubject extends Subject>(name: string, params: CreateCommandParams<GenericOptions, GenericSubject>, execute: (params: CreateCommandExecuteParams<GenericOptions, GenericSubject>) => MaybePromise<void>): Command;
export {};
