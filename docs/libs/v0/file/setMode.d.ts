import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
interface Permissions {
    read?: boolean;
    write?: boolean;
    exec?: boolean;
}
interface ModeObject {
    user?: Permissions;
    group?: Permissions;
    other?: Permissions;
    setUserId?: boolean;
    setGroupId?: boolean;
    sticky?: boolean;
}
type SetMode = ModeObject | number;
declare module "../implementor" {
    interface ServerUtilsFunction {
        setMode(path: string, mode: SetMode): Promise<FileSystemLeft<"set-mode"> | E.Ok>;
    }
}
/**
 * Set file permissions.
 * 
 * Accept a numeric mode or a permission object and return ok/fail.
 * 
 * ```ts
 * const result = await SF.setMode("/tmp/file.txt", 0o644);
 * // result: E.Ok | SF.FileSystemLeft<"set-mode">
 * 
 * await SF.setMode("/tmp/file.txt", {
 * 	user: {
 * 		read: true,
 * 		write: true,
 * 	},
 * });
 * ```
 * 
 * @remarks Object-based permissions are converted to a numeric mode internally.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/setMode
 * @namespace SF
 * 
 */
export declare const setMode: (path: string, mode: SetMode) => Promise<FileSystemLeft<"set-mode"> | E.Ok>;
export {};
