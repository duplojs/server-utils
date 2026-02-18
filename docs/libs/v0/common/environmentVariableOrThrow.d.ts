import { type DP, E } from "@duplojs/utils";
import type * as SF from "../file";
import { type EnvironmentVariableParams } from "./environmentVariable";
declare const EnvironmentVariableError_base: new (params: {
    "@DuplojsServerUtils/environment-variable-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/environment-variable-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"environment-variable-error", unknown>, unknown>;
export declare class EnvironmentVariableError extends EnvironmentVariableError_base {
    error: SF.FileSystemLeft<"read-text-file"> | E.Error<DP.DataParserError>;
    constructor(error: SF.FileSystemLeft<"read-text-file"> | E.Error<DP.DataParserError>);
}
/**
 * Load and validate environment variables or throw.
 * 
 * Read environment variables using the same behavior as `environmentVariable`, but throw `EnvironmentVariableError` when a file cannot be read or schema validation fails.
 * 
 * ```ts
 * const fromRuntime = await environmentVariableOrThrow({
 * 	APP_NAME: DP.string(),
 * });
 * // { APP_NAME: string }
 * 
 * const fromFiles = await environmentVariableOrThrow(
 * 	{
 * 		APP_NAME: DP.string(),
 * 		API_URL: DP.string(),
 * 		PORT: DP.coerce.number(),
 * 	},
 * 	{
 * 		paths: [".env", ".env.local"],
 * 		override: true,
 * 		justRead: true,
 * 	},
 * );
 * // { APP_NAME: string; API_URL: string; PORT: number;}
 * 
 * try {
 * 	await environmentVariableOrThrow(
 * 		{
 * 			PORT: DP.number(), // not a number (add coerce)
 * 		},
 * 		{
 * 			paths: [".env"],
 * 		},
 * 	);
 * } catch (error) {
 * 	if (error instanceof EnvironmentVariableError) {
 * 		// Handle env file read error or schema parsing error.
 * 	}
 * }
 * ```
 * 
 * @remarks
 * The thrown `EnvironmentVariableError` contains the original left value in its `error` property.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariableOrThrow
 * @see https://server-utils.duplojs.dev/en/v0/api/common/environmentVariable
 */
export declare function environmentVariableOrThrow<GenericShape extends DP.DataParserObjectShape>(shape: GenericShape, params?: EnvironmentVariableParams): Promise<DP.DataParserObjectShapeOutput<GenericShape>>;
export {};
