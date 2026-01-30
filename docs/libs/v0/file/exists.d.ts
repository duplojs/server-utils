import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        exists<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"exists"> | E.Ok>;
    }
}
/**
 * Check if a path exists.
 * 
 * Return ok if the path exists, or fail if it does not or cannot be accessed.
 * 
 * ```ts
 * const result = await SF.exists("/tmp/file.txt");
 * // result: E.Ok | SF.FileSystemLeft<"exists">
 * 
 * const missing = await SF.exists("/tmp/missing.txt");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/exists
 * @namespace SF
 * 
 */
export declare const exists: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"exists"> | E.Ok>;
