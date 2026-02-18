import { DP } from "@duplojs/utils";
import { type Option } from "./base";
import type { EligibleDataParser } from "../types";
/**
 * Create an option with a single parsed value.
 * 
 * Use a DataParser schema to parse and validate the option value from `--name=value` or `--name value`.
 * 
 * ```ts
 * const port = SC.createOption("port", DP.string());
 * 
 * const name = SC.createOption(
 * 	"name",
 * 	DP.string(),
 * 	{
 * 		required: true,
 * 		aliases: ["n"],
 * 	},
 * );
 * 
 * const mode = SC.createOption(
 * 	"mode",
 * 	DP.literal(["dev", "prod"]),
 * );
 * 
 * SC.create(
 * 	"serve",
 * 	{
 * 		options: [port, name, mode],
 * 	},
 * 	({ options: { port, name, mode } }) => {
 * 		// port: string | undefined
 * 		// name: string
 * ```
 * 
 * @remarks
 * Set `required: true` to throw when the option is missing.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createOption
 * @namespace SC
 * 
 */
export declare function createOption<GenericName extends string, GenericSchema extends EligibleDataParser>(name: GenericName, schema: GenericSchema, params: {
    description?: string;
    aliases?: readonly string[];
    required: true;
}): Option<GenericName, DP.Output<GenericSchema>>;
export declare function createOption<GenericName extends string, GenericSchema extends EligibleDataParser>(name: GenericName, schema: GenericSchema, params?: {
    description?: string;
    aliases?: readonly string[];
}): Option<GenericName, DP.Output<GenericSchema> | undefined>;
