import * as EE from "@duplojs/utils/either";
import * as DD from "@duplojs/utils/date";
import type { FileSystemLeft } from "./types";
interface SetTimeParams {
    accessTime: DD.TheDate;
    modifiedTime: DD.TheDate;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        setTime(path: string, params: SetTimeParams): Promise<FileSystemLeft<"set-time"> | EE.Ok>;
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
 * // result: E.Ok | SF.FileSystemLeft<"set-time">
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
export declare const setTime: (path: string, params: SetTimeParams) => Promise<FileSystemLeft<"set-time"> | EE.Ok>;
export {};
