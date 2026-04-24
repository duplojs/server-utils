import { type Option } from "./base";
import type { EligibleContract } from "../types";
import type { ComputeOptionContract } from "./types";
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
export declare function createOption<GenericName extends string, GenericContract extends EligibleContract, GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>>(name: GenericName, contract: GenericContract, params: {
    description?: string;
    aliases?: readonly string[];
    required: true;
}): Option<GenericName, GenericOutput>;
export declare function createOption<GenericName extends string, GenericContract extends EligibleContract, GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>>(name: GenericName, contract: GenericContract, params?: {
    description?: string;
    aliases?: readonly string[];
}): Option<GenericName, GenericOutput | undefined>;
