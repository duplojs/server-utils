import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        makeTemporaryDirectory(prefix: string): Promise<FileSystemLeft | E.Success<string>>;
    }
}
/**
 * Create a temporary directory.
 * 
 * Create a temp directory with the given prefix and return its path.
 * 
 * ```ts
 * const tmpDir = await SF.makeTemporaryDirectory("tmp-");
 * // tmpDir: E.Success<string> | SF.FileSystemLeft
 * 
 * const cacheDir = await SF.makeTemporaryDirectory("cache-");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/makeTemporaryDirectory
 * @namespace SF
 * 
 */
export declare const makeTemporaryDirectory: (prefix: string) => Promise<FileSystemLeft | E.Success<string>>;
