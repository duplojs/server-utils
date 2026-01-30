import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface WriteJsonFile {
    space?: number;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        writeJsonFile(path: string, data: unknown, params?: WriteJsonFile): Promise<FileSystemLeft<"write-json-file"> | E.Ok>;
    }
}
/**
 * Serialize and write JSON to a file.
 * 
 * Stringify the data and write it as UTF-8 text, returning ok/fail.
 * 
 * ```ts
 * const result = await SF.writeJsonFile("/tmp/config.json", { enabled: true });
 * // result: E.Ok | SF.FileSystemLeft<"write-json-file">
 * 
 * await SF.writeJsonFile("/tmp/config.json", { enabled: true }, { space: 2 });
 * ```
 * 
 * @remarks If JSON.stringify throws, the function returns a fail.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/writeJsonFile
 * @namespace SF
 * 
 */
export declare const writeJsonFile: (path: string, data: unknown, params?: WriteJsonFile) => Promise<FileSystemLeft<"write-json-file"> | E.Ok>;
export {};
