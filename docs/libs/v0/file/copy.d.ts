import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        copy(fromPath: string | URL, toPath: string | URL): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Copy a file or directory.
 * 
 * Copy from the source path to the destination path and return ok/fail.
 * 
 * ```ts
 * const result = await SF.copy("/tmp/src", "/tmp/dest");
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.copy("/tmp/assets", "/tmp/assets-backup");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/copy
 * @namespace SF
 * 
 */
export declare const copy: (fromPath: string | URL, toPath: string | URL) => Promise<FileSystemLeft | E.Ok>;
