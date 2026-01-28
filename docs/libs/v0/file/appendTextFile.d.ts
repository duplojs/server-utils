import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        appendTextFile(path: string | URL, data: string): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Append text to a file.
 * 
 * Append a string to the target file and return ok/fail.
 * 
 * ```ts
 * const result = await SF.appendTextFile("/tmp/log.txt", "line\n");
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.appendTextFile("/tmp/log.txt", "second line\n");
 * 
 * await asyncPipe(
 * 	"third line\n",
 * 	(text) => SF.appendTextFile("/tmp/log.txt", text),
 * );
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/appendTextFile
 * @namespace SF
 * 
 */
export declare const appendTextFile: (path: string | URL, data: string) => Promise<FileSystemLeft | E.Ok>;
