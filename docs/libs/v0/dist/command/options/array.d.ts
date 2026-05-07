import { type Kind } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import type * as AA from "@duplojs/utils/array";
import { type Option } from "./base";
import type { EligibleSpec } from "../types";
import type { ComputeOptionSpec } from "./types";
export declare const arrayOptionKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-array-option", unknown>>;
type _ArrayOption<GenericName extends string = string, GenericExecuteOutputValue extends unknown = unknown> = (Option<GenericName, GenericExecuteOutputValue> & Kind<typeof arrayOptionKind.definition>);
export interface ArrayOption<GenericName extends string = string, GenericExecuteOutputValue extends unknown = unknown> extends _ArrayOption<GenericName, GenericExecuteOutputValue> {
    readonly spec: EligibleSpec;
    readonly dataParser: DDP.DataParser;
    readonly required: boolean;
    readonly separator: string;
    readonly min?: number;
    readonly max?: number;
}
/**
 * Create an option that parses an array of values.
 * 
 * This option parses a delimited string value into an array and validates each element with the provided DataParser or clean contract.
 * 
 * ```ts
 * const ids = SC.createArrayOption(
 * 	"ids",
 * 	DP.number(),
 * 	{
 * 		required: true,
 * 		min: 1,
 * 	},
 * );
 * 
 * const paths = SC.createArrayOption(
 * 	"paths",
 * 	DP.string(),
 * 	{ separator: ";" },
 * );
 * 
 * const UserId = C.createNewType("user-id", DP.number(), C.Positive);
 * const userIds = SC.createArrayOption("userIds", UserId);
 * 
 * const tags = SC.createArrayOption("tags", DP.string());
 * const emails = SC.createArrayOption("emails", C.Email);
 * 
 * SC.create(
 * 	"batch",
 * 	{
 * 		options: [tags, ids, paths, emails, userIds],
 * 	},
 * 	({ options: { emails, ids, paths, tags, userIds } }) => {
 * 		// ids: [number, ...number[]]
 * 		// tags: string[] | undefined
 * 		// paths: string[] | undefined
 * 		// emails: C.Email[] | undefined
 * 		// userIds: C.GetNewType<typeof UserId>[] | undefined
 * 	},
 * );
 * ```
 * 
 * @remarks
 * The default separator is `,`. You can customize it with `separator`, and primitive elements are coerced from CLI string input.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createArrayOption
 * @namespace SC
 * 
 */
export declare function createArrayOption<GenericName extends string, GenericSpec extends EligibleSpec, GenericMinValues extends number>(name: GenericName, spec: GenericSpec, params: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    required: true;
    separator?: string;
}): ArrayOption<GenericName, [
    ...AA.CreateTuple<ComputeOptionSpec<GenericSpec>, GenericMinValues>,
    ...ComputeOptionSpec<GenericSpec>[]
]>;
export declare function createArrayOption<GenericName extends string, GenericSpec extends EligibleSpec, GenericMinValues extends number>(name: GenericName, spec: GenericSpec, params?: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    separator?: string;
}): ArrayOption<GenericName, [
    ...AA.CreateTuple<ComputeOptionSpec<GenericSpec>, GenericMinValues>,
    ...ComputeOptionSpec<GenericSpec>[]
] | undefined>;
export {};
