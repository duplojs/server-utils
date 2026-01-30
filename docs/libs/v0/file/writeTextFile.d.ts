import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        writeTextFile(path: string, data: string): Promise<FileSystemLeft<"write-text-file"> | E.Ok>;
    }
}
/**
 * Write UTF-8 text to a file.
 * 
 * Write the provided string to the target path and return ok/fail.
 * 
 * ```ts
 * const result = await SF.writeTextFile("/tmp/log.txt", "hello\n");
 * // result: E.Ok | SF.FileSystemLeft<"write-text-file">
 * 
 * await SF.writeTextFile("/tmp/log.txt", "world\n");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/writeTextFile
 * @namespace SF
 * 
 */
export declare const writeTextFile: (path: string, data: string) => Promise<FileSystemLeft<"write-text-file"> | E.Ok>;
