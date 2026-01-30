import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        move(fromPath: string, toPath: string): Promise<FileSystemLeft<"move"> | E.Ok>;
    }
}
/**
 * Move a file or directory.
 * 
 * Move or rename the path and return ok/fail.
 * 
 * ```ts
 * const result = await SF.move("/tmp/src", "/tmp/dest");
 * // result: E.Ok | SF.FileSystemLeft<"move">
 * 
 * await SF.move("/tmp/file.txt", "/tmp/archive/file.txt");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/move
 * @namespace SF
 * 
 */
export declare const move: (fromPath: string, toPath: string) => Promise<FileSystemLeft<"move"> | E.Ok>;
