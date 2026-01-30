import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        rename(path: string, newName: string): Promise<FileSystemLeft<"rename"> | E.Success<string>>;
    }
}
/**
 * Rename a path within its parent directory.
 * 
 * Rename the entry to a new name and return the new path.
 * 
 * ```ts
 * import { SF } from "..";
 * 
 * const result = await SF.rename("/tmp/file.txt", "renamed.txt");
 * // result: E.Success<string> | SF.FileSystemLeft<"rename">
 * 
 * await SF.rename("/tmp/notes.txt", "notes-old.txt");
 * 
 * const moreResult = await SF.rename("/tmp/archive.log", "archive-old.log");
 * // moreResult: E.Success<string> | SF.FileSystemLeft<"rename">
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/rename
 * @namespace SF
 * 
 */
export declare const rename: (path: string, newName: string) => Promise<FileSystemLeft<"rename"> | E.Success<string>>;
