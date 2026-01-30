import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        readJsonFile<GenericOutput extends unknown, GenericPath extends string = string>(path: GenericPath): Promise<FileSystemLeft<"read-json-file"> | E.Success<GenericOutput>>;
    }
}
/**
 * Read and parse a JSON file.
 * 
 * Parse JSON content and return the value as an Either.
 * 
 * ```ts
 * const config = await SF.readJsonFile("/tmp/config.json");
 * // config: E.Success<unknown> | SF.FileSystemLeft<"read-json-file">
 * 
 * const data = await SF.readJsonFile("/tmp/data.json");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readJsonFile
 * @namespace SF
 * 
 */
export declare const readJsonFile: <GenericOutput extends unknown, GenericPath extends string = string>(path: GenericPath) => Promise<FileSystemLeft<"read-json-file"> | E.Success<GenericOutput>>;
