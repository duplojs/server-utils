import { E } from "@duplojs/utils";
declare module "../implementor" {
    interface ServerUtilsFunction {
        setCurrentWorkingDirectory<GenericPath extends string | URL>(path: GenericPath): E.Fail | E.Ok;
    }
}
/**
 * Change the current working directory.
 * 
 * Update the current directory using a string path or URL,
 * and return an Either ok/fail based on the result.
 * 
 * ```ts
 * setCurrentWorkingDirectory("/tmp/project");
 * // Either ok/fail.
 * 
 * setCurrentWorkingDirectory(new URL("file:///tmp/project"));
 * // Either ok/fail.
 * ```
 * 
 * @remarks URLs are decoded to a filesystem path.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
 * 
 */
export declare const setCurrentWorkingDirectory: <GenericPath extends string | URL>(path: GenericPath) => E.Fail | E.Ok;
