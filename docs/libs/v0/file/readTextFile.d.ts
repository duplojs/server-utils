import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        readTextFile<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"read-text-file"> | E.Success<string>>;
    }
}
/**
 * Read a file as UTF-8 text.
 * 
 * Return an Either with the file content as a string, or fail if the read fails.
 * 
 * ```ts
 * const result = await SF.readTextFile("/tmp/notes.txt");
 * // result: E.Success<string> | SF.FileSystemLeft<"read-text-file">
 * 
 * const other = await SF.readTextFile("/tmp/readme.txt");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readTextFile
 * @namespace SF
 * 
 */
export declare const readTextFile: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"read-text-file"> | E.Success<string>>;
