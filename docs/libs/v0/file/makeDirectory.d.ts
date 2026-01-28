import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface MakeDirectoryParams {
    recursive?: boolean;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        makeDirectory<GenericPath extends string | URL>(path: GenericPath, params?: MakeDirectoryParams): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Create a directory.
 * 
 * Create the directory and optionally its parents when recursive is true.
 * 
 * ```ts
 * const result = await SF.makeDirectory("/tmp/project");
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.makeDirectory("/tmp/project/sub", { recursive: true });
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/makeDirectory
 * @namespace SF
 * 
 */
export declare const makeDirectory: <GenericPath extends string | URL>(path: GenericPath, params?: MakeDirectoryParams) => Promise<FileSystemLeft | E.Ok>;
export {};
