import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        realPath<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"real-path"> | E.Success<string>>;
    }
}
/**
 * Resolve a path to its canonical location.
 * 
 * Return the real, resolved path string or fail if resolution fails.
 * 
 * ```ts
 * const resolved = await SF.realPath("/tmp/./file.txt");
 * // resolved: E.Success<string> | SF.FileSystemLeft<"real-path">
 * 
 * const other = await SF.realPath("/tmp/../tmp/file.txt");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/realPath
 * @namespace SF
 * 
 */
export declare const realPath: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"real-path"> | E.Success<string>>;
