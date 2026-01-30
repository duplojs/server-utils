import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        link(existingPath: string, newPath: string): Promise<FileSystemLeft<"link"> | E.Ok>;
    }
}
/**
 * Create a hard link.
 * 
 * Create a hard link pointing to an existing path and return ok/fail.
 * 
 * ```ts
 * const result = await SF.link("/tmp/original", "/tmp/hardlink");
 * // result: E.Ok | SF.FileSystemLeft<"link">
 * 
 * await SF.link("/tmp/data.bin", "/tmp/data-copy.bin");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/link
 * @namespace SF
 * 
 */
export declare const link: (existingPath: string, newPath: string) => Promise<FileSystemLeft<"link"> | E.Ok>;
