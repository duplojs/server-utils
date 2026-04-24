import type * as AA from "@duplojs/utils/array";
import type { Option } from "./base";
import type { EligibleContract } from "../types";
import type { ComputeOptionContract } from "./types";
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
 * 	({ options: { ids, tags, paths, emails, userIds } }) => {
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
export declare function createArrayOption<GenericName extends string, GenericContract extends EligibleContract, GenericMinValues extends number>(name: GenericName, contract: GenericContract, params: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    required: true;
    separator?: string;
}): Option<GenericName, [
    ...AA.CreateTuple<ComputeOptionContract<GenericContract>, GenericMinValues>,
    ...ComputeOptionContract<GenericContract>[]
]>;
export declare function createArrayOption<GenericName extends string, GenericContract extends EligibleContract, GenericMinValues extends number>(name: GenericName, contract: GenericContract, params?: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    separator?: string;
}): Option<GenericName, [
    ...AA.CreateTuple<ComputeOptionContract<GenericContract>, GenericMinValues>,
    ...ComputeOptionContract<GenericContract>[]
] | undefined>;
