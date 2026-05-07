import { type Kind } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";
import type { EligibleSpec, EligibleSpecOutput } from "./types";
import { type CommandError, type SymbolCommandError } from "./error";
export declare const argumentKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-argument", unknown>>;
export interface Argument<GenericName extends string = string, GenericExecuteOutput extends unknown = unknown> extends Kind<typeof argumentKind.definition> {
    readonly name: GenericName;
    readonly spec: EligibleSpec;
    readonly dataParser: DDP.DataParser;
    readonly optional: boolean;
    readonly description?: string;
    execute(argument: string | undefined, error: CommandError): Promise<GenericExecuteOutput | SymbolCommandError>;
}
/**
 * Create a positional argument parser for command subjects.
 * 
 * Use this builder to define an argument name, a parsing spec, and optional metadata (`description`, `optional`) used by command help and execution.
 * 
 * ```ts
 * const source = SC.createArgument("source", DP.string());
 * const target = SC.createArgument(
 * 	"target",
 * 	DP.string(),
 * 	{
 * 		optional: true,
 * 		description: "Optional output file path",
 * 	},
 * );
 * 
 * SC.create(
 * 	"copy",
 * 	{
 * 		subjects: [source, target],
 * 	},
 * 	({ args }) => {
 * 		// args.source: string
 * 		// args.target: string | undefined
 * 	},
 * );
 * 
 * const UserId = C.createNewType("user-id", DP.number(), C.Positive);
 * const userId = SC.createArgument("userId", UserId);
 * 
 * await SC.exec(
 * 	{
 * 		subjects: [userId],
 * 	},
 * 	({ args }) => {
 * 		// args.userId: C.GetNewType<typeof UserId>
 * 	},
 * );
 * ```
 * 
 * @remarks
 * `createArgument` is designed to be used inside `subjects` for [`create`](/en/v0/api/command/create) or [`exec`](/en/v0/api/command/exec).  
 * Parsed values are exposed in the execute callback as `args.<argumentName>`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createArgument
 * @namespace SC
 * 
 */
export declare function createArgument<GenericName extends string, GenericEligibleSpec extends EligibleSpec>(name: GenericName, spec: GenericEligibleSpec, params?: {
    readonly description?: string;
    readonly optional?: false;
}): Argument<GenericName, EligibleSpecOutput<GenericEligibleSpec>>;
export declare function createArgument<GenericName extends string, GenericEligibleSpec extends EligibleSpec>(name: GenericName, spec: GenericEligibleSpec, params?: {
    readonly description?: string;
    readonly optional: boolean;
}): Argument<GenericName, EligibleSpecOutput<GenericEligibleSpec> | undefined>;
