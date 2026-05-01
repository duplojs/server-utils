import * as EE from "@duplojs/utils/either";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        ensureFile<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"ensure-file"> | EE.Ok>;
    }
}
/**
 * Ensure a file exists.
 * 
 * Create the file if it does not exist and return ok/fail.
 * 
 * ```ts
 * const result = await SF.ensureFile("/tmp/empty.txt");
 * // result: E.Ok | SF.FileSystemLeft<"ensure-file">
 * 
 * await SF.ensureFile("/tmp/cache.json");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/ensureFile
 * @namespace SF
 * 
 */
export declare const ensureFile: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"ensure-file"> | EE.Ok>;
