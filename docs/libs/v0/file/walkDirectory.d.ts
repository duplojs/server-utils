import { E } from "@duplojs/utils";
import { type FileInterface } from "./fileInterface";
import { type FolderInterface } from "./folderInterface";
import { type UnknownInterface } from "./unknownInterface";
import type { FileSystemLeft } from "./types";
interface WalkDirectoryParams {
    recursive?: boolean;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        walkDirectory<GenericPath extends string>(path: GenericPath, params?: WalkDirectoryParams): Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FileInterface | FolderInterface | UnknownInterface>>>;
    }
}
/**
 * Walk a directory recursively.
 * 
 * Return a generator of file, folder, or unknown interfaces.
 * 
 * ```ts
 * const result = await SF.walkDirectory("/tmp/project");
 * // result: E.Success<Generator<...>> | SF.FileSystemLeft<"walk-directory">
 * 
 * const other = await SF.walkDirectory("/tmp/other");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/walkDirectory
 * @namespace SF
 * 
 */
export declare const walkDirectory: <GenericPath extends string>(path: GenericPath, params?: WalkDirectoryParams) => Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FileInterface | FolderInterface | UnknownInterface>>>;
export {};
