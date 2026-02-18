import { type A, DP } from "@duplojs/utils";
import { type Option } from "./base";
import type { EligibleDataParser } from "../types";
/**
 * Create an option that parses an array of values.
 * 
 * This option parses a delimited string value into an array and validates each element with the provided DataParser schema.
 * 
 * ```ts
 * const tags = SC.createArrayOption("tags", DP.string());
 * 
 * const ids = SC.createArrayOption(
 * 	"ids",
 * 	DP.string(),
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
 * SC.create(
 * 	"batch",
 * 	{
 * 		options: [tags, ids, paths],
 * 	},
 * 	({ options: { ids, tags, paths } }) => {
 * 		// ids: [string, ...string[]]
 * 		// tags: string[] | undefined
 * 		// paths: string[] | undefined
 * 	},
 * );
 * ```
 * 
 * @remarks
 * The default separator is `,`. You can customize it with `separator`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createArrayOption
 * @namespace SC
 * 
 */
export declare function createArrayOption<GenericName extends string, GenericSchema extends EligibleDataParser, GenericMinValues extends number>(name: GenericName, schema: GenericSchema, params: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    required: true;
    separator?: string;
}): Option<GenericName, [
    ...A.CreateTuple<DP.Output<GenericSchema>, GenericMinValues>,
    ...DP.Output<GenericSchema>[]
]>;
export declare function createArrayOption<GenericName extends string, GenericSchema extends EligibleDataParser, GenericMinValues extends number>(name: GenericName, schema: GenericSchema, params?: {
    description?: string;
    aliases?: readonly string[];
    min?: GenericMinValues;
    max?: number;
    separator?: string;
}): Option<GenericName, [
    ...A.CreateTuple<DP.Output<GenericSchema>, GenericMinValues>,
    ...DP.Output<GenericSchema>[]
] | undefined>;
