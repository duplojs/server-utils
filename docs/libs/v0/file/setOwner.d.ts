import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface SetOwnerParams {
    userId: number;
    groupId: number;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        setOwner(path: string | URL, params: SetOwnerParams): Promise<FileSystemLeft | E.Ok>;
    }
}
/**
 * Set file ownership.
 * 
 * Update the user and group IDs for the path and return ok/fail.
 * 
 * ```ts
 * const result = await SF.setOwner("/tmp/file.txt", {
 * 	userId: 1000,
 * 	groupId: 1000,
 * });
 * // result: E.Ok | SF.FileSystemLeft
 * 
 * await SF.setOwner("/tmp/app.log", {
 * 	userId: 0,
 * 	groupId: 0,
 * });
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/setOwner
 * @namespace SF
 * 
 */
export declare const setOwner: (path: string | URL, params: SetOwnerParams) => Promise<FileSystemLeft | E.Ok>;
export {};
