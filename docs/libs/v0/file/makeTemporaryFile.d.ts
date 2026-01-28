import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        makeTemporaryFile(prefix: string, suffix?: string): Promise<FileSystemLeft | E.Success<string>>;
    }
}
/**
 * Create a temporary file.
 * 
 * Create a temp file with a prefix and optional suffix and return its path.
 * 
 * ```ts
 * const tmpFile = await SF.makeTemporaryFile("tmp-", ".log");
 * // tmpFile: E.Success<string> | SF.FileSystemLeft
 * 
 * const report = await SF.makeTemporaryFile("report-");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/makeTemporaryFile
 * @namespace SF
 * 
 */
export declare const makeTemporaryFile: (prefix: string, suffix?: string) => Promise<FileSystemLeft | E.Success<string>>;
