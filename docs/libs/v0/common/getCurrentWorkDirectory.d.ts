import * as EE from "@duplojs/utils/either";
declare module "../implementor" {
    interface ServerUtilsFunction {
        getCurrentWorkDirectory(): EE.Error<unknown> | EE.Success<string>;
        getCurrentWorkDirectoryOrThrow(): string;
    }
}
/**
 * Return the current working directory.
 * 
 * Return an Either containing the current path for the current runtime,
 * or an error if the working directory cannot be read.
 * 
 * ```ts
 * const cwd = getCurrentWorkDirectory();
 * // cwd is an Either with the current path.
 * 
 * setCurrentWorkingDirectory("/tmp");
 * const after = getCurrentWorkDirectory();
 * // after is an Either with the new path.
 * 
 * const current = getCurrentWorkDirectory();
 * // current is an Either with the current path.
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/getCurrentWorkDirectory
 * 
 */
export declare const getCurrentWorkDirectory: () => EE.Error<unknown> | EE.Success<string>;
