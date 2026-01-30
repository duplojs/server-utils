import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        appendFile(path: string, data: Uint8Array): Promise<FileSystemLeft<"append-file"> | E.Ok>;
    }
}
/**
 * Append binary data to a file.
 * 
 * Append a Uint8Array to the target file and return ok/fail.
 * 
 * ```ts
 * const data = new Uint8Array([4, 5]);
 * const result = await SF.appendFile("/tmp/log.bin", data);
 * // result: E.Ok | SF.FileSystemLeft<"append-file">
 * 
 * const more = new Uint8Array([6]);
 * await SF.appendFile("/tmp/log.bin", more);
 * 
 * await asyncPipe(
 * 	new Uint8Array([7, 8]),
 * 	(data) => SF.appendFile("/tmp/log.bin", data),
 * );
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/appendFile
 * @namespace SF
 * 
 */
export declare const appendFile: (path: string, data: Uint8Array) => Promise<FileSystemLeft<"append-file"> | E.Ok>;
