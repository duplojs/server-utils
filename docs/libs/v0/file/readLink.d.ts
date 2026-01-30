import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        readLink<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"read-link"> | E.Success<string>>;
    }
}
/**
 * Read the target of a symbolic link.
 * 
 * Return the link target path as a string, or fail.
 * 
 * ```ts
 * const target = await SF.readLink("/tmp/link");
 * // target: E.Success<string> | SF.FileSystemLeft<"read-link">
 * 
 * const other = await SF.readLink("/tmp/other-link");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readLink
 * @namespace SF
 * 
 */
export declare const readLink: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"read-link"> | E.Success<string>>;
