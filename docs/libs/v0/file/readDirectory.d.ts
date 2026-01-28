import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface ReadDirectoryParams {
    recursive?: true;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        readDirectory<GenericPath extends string | URL>(path: GenericPath, params?: ReadDirectoryParams): Promise<FileSystemLeft | E.Success<string[]>>;
    }
}
/**
 * List entries in a directory.
 * 
 * Return an array of entry names, optionally recursively.
 * 
 * ```ts
 * const entries = await SF.readDirectory("/tmp");
 * // entries: E.Success<string[]> | SF.FileSystemLeft
 * 
 * const recursive = await SF.readDirectory("/tmp", { recursive: true });
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readDirectory
 * @namespace SF
 * 
 */
export declare const readDirectory: <GenericPath extends string | URL>(path: GenericPath, params?: ReadDirectoryParams) => Promise<FileSystemLeft | E.Success<string[]>>;
export {};
