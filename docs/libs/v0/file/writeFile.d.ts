import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        writeFile(path: string, data: Uint8Array): Promise<FileSystemLeft<"write-file"> | E.Ok>;
    }
}
/**
 * Write binary data to a file.
 * 
 * Write the provided Uint8Array to the target path and return ok/fail.
 * 
 * ```ts
 * const data = new Uint8Array([1, 2, 3]);
 * const result = await SF.writeFile("/tmp/file.bin", data);
 * // result: E.Ok | SF.FileSystemLeft<"write-file">
 * 
 * await SF.writeFile("/tmp/backup.bin", data);
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/writeFile
 * @namespace SF
 * 
 */
export declare const writeFile: (path: string, data: Uint8Array) => Promise<FileSystemLeft<"write-file"> | E.Ok>;
