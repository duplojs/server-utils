import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface RemoveDirectoryParams {
    recursive?: boolean;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        remove<GenericPath extends string | URL>(path: GenericPath, params?: RemoveDirectoryParams): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Remove a file or directory.
 * 
 * Remove the path and return ok/fail. Use recursive to delete directories.
 * 
 * ```ts
 * const result = await SF.remove("/tmp/file.txt");
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.remove("/tmp/project", { recursive: true });
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/remove
 * @namespace SF
 * 
 */
export declare const remove: <GenericPath extends string | URL>(path: GenericPath, params?: RemoveDirectoryParams) => Promise<FileSystemLeft | E.Ok>;
export {};
