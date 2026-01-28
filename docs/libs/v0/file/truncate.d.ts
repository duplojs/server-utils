import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        truncate<GenericPath extends string | URL>(path: GenericPath, size?: number): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Truncate a file to a given size.
 * 
 * Resize the file to the specified number of bytes and return ok/fail.
 * 
 * ```ts
 * const cleared = await SF.truncate("/tmp/file.bin", 0);
 * // cleared: E.Ok | SF.FileSystemLeft
 * 
 * await SF.truncate("/tmp/file.bin", 128);
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/truncate
 * @namespace SF
 * 
 */
export declare const truncate: <GenericPath extends string | URL>(path: GenericPath, size?: number) => Promise<FileSystemLeft | E.Ok>;
