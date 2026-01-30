import { E } from "@duplojs/utils";
declare module "../implementor" {
    interface ServerUtilsFunction {
        getCurrentWorkDirectory(): E.Error<unknown> | E.Success<string>;
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
 * import { getCurrentWorkDirectory, setCurrentWorkingDirectory } from "..";
 * 
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
export declare const getCurrentWorkDirectory: () => E.Error<unknown> | E.Success<string>;
/**
 * Return the current working directory or throw.
 * 
 * Return the current path directly and throw if the runtime cannot read it.
 * 
 * ```ts
 * import { getCurrentWorkDirectoryOrThrow, setCurrentWorkingDirectory } from "..";
 * 
 * const cwd = getCurrentWorkDirectoryOrThrow();
 * // cwd: string
 * 
 * setCurrentWorkingDirectory("/tmp");
 * const after = getCurrentWorkDirectoryOrThrow();
 * // after: string
 * 
 * const path = getCurrentWorkDirectoryOrThrow();
 * // path: string
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/getCurrentWorkDirectoryOrThrow
 * 
 */
export declare const getCurrentWorkDirectoryOrThrow: () => string;
