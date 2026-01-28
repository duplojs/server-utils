import { D, E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface SetTimeParams {
    accessTime: D.TheDate;
    modifiedTime: D.TheDate;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        setTime(path: string | URL, params: SetTimeParams): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Set access and modification timestamps.
 * 
 * Update accessTime and modifiedTime for the path and return ok/fail.
 * 
 * ```ts
 * const now = D.now();
 * const result = await SF.setTime("/tmp/file.txt", {
 * 	accessTime: now,
 * 	modifiedTime: now,
 * });
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.setTime("/tmp/report.txt", {
 * 	accessTime: now,
 * 	modifiedTime: now,
 * });
 * ```
 * 
 * @remarks Dates are converted to timestamps before calling the runtime APIs.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/setTime
 * @namespace SF
 * 
 */
export declare const setTime: (path: string | URL, params: SetTimeParams) => Promise<FileSystemLeft | E.Ok>;
export {};
