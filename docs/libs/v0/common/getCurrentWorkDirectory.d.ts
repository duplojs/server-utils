import { E } from "@duplojs/utils";
declare module "../implementor" {
    interface ServerUtilsFunction {
        getCurrentWorkDirectory(): E.Fail | E.Success<string>;
    }
}
/**
 * Return the current working directory.
 * 
 * Return an Either containing the current path for the current runtime,
 * or a fail if the working directory cannot be read.
 * 
 * ```ts
 * const cwd = getCurrentWorkDirectory();
 * // cwd is an Either with the current path.
 * 
 * setCurrentWorkingDirectory("/tmp");
 * const after = getCurrentWorkDirectory();
 * // after is an Either with the new path.
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/getCurrentWorkDirectory
 * 
 */
export declare const getCurrentWorkDirectory: () => E.Fail | E.Success<string>;
