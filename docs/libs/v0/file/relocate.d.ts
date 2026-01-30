import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        relocate(fromPath: string, toPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<string>>;
    }
}
/**
 * Relocate a path into a new parent directory.
 * 
 * Move the entry into a new parent directory while preserving its base name,
 * and return the new path on success.
 * 
 * ```ts
 * import { E, unwrap } from "@duplojs/utils";
 * import { SF } from "..";
 * 
 * const result = await SF.relocate("/tmp/report.txt", "/tmp/archive");
 * // result: E.Success<string> | SF.FileSystemLeft<"relocate">
 * 
 * if (E.isRight(result)) {
 * 	const newPath = unwrap(result);
 * 	// newPath: string
 * }
 * 
 * await SF.relocate("/tmp/photo.png", "/tmp/images");
 * await SF.relocate("/tmp/logs/app.log", "/tmp/logs/old");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/relocate
 * @namespace SF
 * 
 */
export declare const relocate: (fromPath: string, toPath: string) => Promise<FileSystemLeft<"relocate"> | E.Success<string>>;
