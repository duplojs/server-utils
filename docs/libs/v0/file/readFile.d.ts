import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        readFile<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"read-file"> | E.Success<Uint8Array>>;
    }
}
/**
 * Read a file as bytes.
 * 
 * Return an Either with the file content as a Uint8Array, or fail if the read fails.
 * 
 * ```ts
 * const result = await SF.readFile("/tmp/file.bin");
 * // result: E.Success<Uint8Array> | SF.FileSystemLeft<"read-file">
 * 
 * const other = await SF.readFile("/tmp/backup.bin");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readFile
 * @namespace SF
 * 
 */
export declare const readFile: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"read-file"> | E.Success<Uint8Array>>;
