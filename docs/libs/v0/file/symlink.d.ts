import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
export interface SymlinkParams {
    /**
     * @remarks
     * Specify the symbolic link type as file, directory or NTFS junction.
     * This option only applies to Windows and is ignored on other operating systems.
     */
    type: "file" | "dir" | "junction";
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        symlink(oldPath: string, newPath: string, params?: SymlinkParams): Promise<FileSystemLeft<"symlink"> | E.Ok>;
    }
}
/**
 * Create a symbolic link.
 * 
 * Create a symlink from newPath to oldPath and return ok/fail.
 * 
 * ```ts
 * const result = await SF.symlink("/tmp/target", "/tmp/link");
 * // result: E.Ok | SF.FileSystemLeft<"symlink">
 * 
 * await SF.symlink("/tmp/target", "/tmp/link-file", { type: "file" });
 * ```
 * 
 * @remarks On Windows you can specify type as "file", "dir", or "junction".
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/symlink
 * @namespace SF
 * 
 */
export declare const symlink: (oldPath: string, newPath: string, params?: SymlinkParams) => Promise<FileSystemLeft<"symlink"> | E.Ok>;
