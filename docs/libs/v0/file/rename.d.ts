import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        rename(path: string | URL, newName: string): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Rename a path within its parent directory.
 * 
 * Rename the entry to a new name and return ok/fail.
 * 
 * ```ts
 * const result = await SF.rename("/tmp/file.txt", "renamed.txt");
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.rename("/tmp/notes.txt", "notes-old.txt");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/rename
 * @namespace SF
 * 
 */
export declare const rename: (path: string | URL, newName: string) => Promise<FileSystemLeft | E.Ok>;
