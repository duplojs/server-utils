import { DP, E } from "@duplojs/utils";
import type * as SF from "../../file";
export interface EnvironmentVariableParams {
    /** Env file paths to read and merge with runtime environment variables. */
    paths?: string[];
    /**
     * Allow values from env files to replace existing runtime environment values.
     * @default false
     */
    override?: boolean;
    /**
     * Parse and validate values without writing resolved variables back to the runtime environment.
     * @default false
     */
    justRead?: boolean;
}
declare module "../../implementor" {
    interface ServerUtilsFunction {
        environmentVariable<GenericShape extends DP.DataParserObjectShape>(shape: GenericShape, params?: EnvironmentVariableParams): Promise<E.Success<DP.DataParserObjectShapeOutput<GenericShape>> | SF.FileSystemLeft<"read-text-file"> | E.Error<DP.DataParserError>>;
    }
}
/**
 * Load and validate environment variables.
 * 
 * Read variables from runtime environment and optional env files, expand references, validate values with a DataParser shape, and return an Either result.
 * 
 * ```ts
 * const fromRuntime = await environmentVariable({
 * 	APP_NAME: DP.string(),
 * });
 * // Success<{ APP_NAME: string }> | Left<...> | L..
 * 
 * const fromFiles = await environmentVariable(
 * 	{
 * 		APP_NAME: DP.string(),
 * 		API_URL: DP.string(),
 * 		PORT: DP.coerce.number(),
 * 	},
 * 	{
 * 		paths: [".env", ".env.local"],
 * 		override: true,
 * 		justRead: true, // not override runtime env
 * 	},
 * );
 * // Success<{ APP_NAME: string; API_URL: string; PORT: number;}> |  Left<...> | L..
 * 
 * await environmentVariable(
 * 	{
 * 		APP_NAME: DP.string(),
 * 	},
 * 	{
 * 		override: false,
 * 		justRead: false,
 * 	},
 * );
 * // Parse values and write resolved variables back to runtime env.
 * ```
 * 
 * @remarks
 * Set `justRead` to `true` to avoid mutating runtime environment variables after parsing.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable
 * 
 */
export declare const environmentVariable: <GenericShape extends DP.DataParserObjectShape>(shape: GenericShape, params?: EnvironmentVariableParams) => Promise<E.Success<DP.DataParserObjectShapeOutput<GenericShape>> | SF.FileSystemLeft<"read-text-file"> | E.Error<DP.DataParserError>>;
