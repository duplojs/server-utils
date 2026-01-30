import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        ensureDirectory<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"ensure-directory"> | E.Ok>;
    }
}
/**
 * Ensure a directory exists.
 * 
 * Create the directory with recursive mode and return ok/fail.
 * 
 * ```ts
 * const result = await SF.ensureDirectory("/tmp/project");
 * // result: E.Ok | SF.FileSystemLeft<"ensure-directory">
 * 
 * await SF.ensureDirectory("/tmp/project/sub");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/ensureDirectory
 * @namespace SF
 * 
 */
export declare const ensureDirectory: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"ensure-directory"> | E.Ok>;
