import { type Kind } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";
import { type Option } from "./base";
import type { EligibleSpec } from "../types";
import type { ComputeOptionSpec } from "./types";
export declare const simpleOptionKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-simple-option", unknown>>;
type _SimpleOption<GenericName extends string = string, GenericExecuteOutputValue extends unknown = unknown> = (Option<GenericName, GenericExecuteOutputValue> & Kind<typeof simpleOptionKind.definition>);
export interface SimpleOption<GenericName extends string = string, GenericExecuteOutputValue extends unknown = unknown> extends _SimpleOption<GenericName, GenericExecuteOutputValue> {
    readonly spec: EligibleSpec;
    readonly dataParser: DDP.DataParser;
    readonly required: boolean;
}
/**
 * Create an option with a single parsed value.
 * 
 * Use a DataParser or a clean contract to parse and validate the option value from `--name=value` or `--name value`.
 * 
 * ```ts
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
 * const UserId = C.createNewType("user-id", DP.number(), C.Positive);
 * const userId = SC.createOption("userId", UserId);
 * 
 * const port = SC.createOption("port", DP.number());
 * const email = SC.createOption("email", C.Email);
 * 
 * SC.create(
 * 	"serve",
 * 	{
 * 		options: [port, name, mode, email, userId],
 * 	},
 * 	({ options: { port, name, mode, email, userId } }) => {
 * 		// port: number | undefined
 * 		// name: string
 * 		// mode: "dev" | "prod" | undefined
 * 		// email: C.Email | undefined
 * 		// userId: C.GetNewType<typeof UserId> | undefined
 * 	},
 * );
 * ```
 * 
 * @remarks
 * Primitive parsers and clean primitive contracts are coerced from CLI string input automatically.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command/createOption
 * @namespace SC
 * 
 */
export declare function createOption<GenericName extends string, GenericSpec extends EligibleSpec, GenericOutput extends ComputeOptionSpec<GenericSpec> = ComputeOptionSpec<GenericSpec>>(name: GenericName, spec: GenericSpec, params: {
    description?: string;
    aliases?: readonly string[];
    required: true;
}): SimpleOption<GenericName, GenericOutput>;
export declare function createOption<GenericName extends string, GenericSpec extends EligibleSpec, GenericOutput extends ComputeOptionSpec<GenericSpec> = ComputeOptionSpec<GenericSpec>>(name: GenericName, spec: GenericSpec, params?: {
    description?: string;
    aliases?: readonly string[];
}): SimpleOption<GenericName, GenericOutput | undefined>;
export {};
