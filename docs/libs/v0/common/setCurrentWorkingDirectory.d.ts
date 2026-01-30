import { E } from "@duplojs/utils";
declare module "../implementor" {
    interface ServerUtilsFunction {
        setCurrentWorkingDirectory<GenericPath extends string>(path: GenericPath): E.Fail | E.Ok;
    }
}
/**
 * Change the current working directory.
 * 
 * Update the current directory using a string path,
 * and return an Either ok/fail based on the result.
 * 
 * ```ts
 * import { setCurrentWorkingDirectory } from "..";
 * 
 * setCurrentWorkingDirectory("/tmp/project");
 * // Either ok/fail.
 * 
 * setCurrentWorkingDirectory("/tmp/another-project");
 * // Either ok/fail.
 * 
 * const workingDirectory = "/tmp/third-project";
 * setCurrentWorkingDirectory(workingDirectory);
 * // Either ok/fail.
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
 * 
 */
export declare const setCurrentWorkingDirectory: <GenericPath extends string>(path: GenericPath) => E.Fail | E.Ok;
