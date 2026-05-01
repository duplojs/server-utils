import * as EE from "@duplojs/utils/either";
declare module "../implementor" {
    interface ServerUtilsFunction {
        setCurrentWorkingDirectory<GenericPath extends string>(path: GenericPath): EE.Fail | EE.Ok;
    }
}
/**
 * Change the current working directory.
 * 
 * Update the current directory using a string path,
 * and return an Either ok/fail based on the result.
 * Use `setCurrentWorkingDirectoryOrThrow` if you prefer an exception-based failure flow.
 * 
 * ```ts
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
export declare const setCurrentWorkingDirectory: <GenericPath extends string>(path: GenericPath) => EE.Fail | EE.Ok;
