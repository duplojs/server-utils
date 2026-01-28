import { E } from "@duplojs/utils";
import type { StatInfo } from "./stat";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        linkStat<GenericPath extends string | URL>(path: GenericPath): Promise<FileSystemLeft | E.Success<StatInfo>>;
    }
}
/**
 * Read metadata about a symlink itself.
 * 
 * Return a StatInfo object for the link rather than the target.
 * 
 * ```ts
 * const info = await SF.linkStat("/tmp/link");
 * // info: E.Success<StatInfo> | SF.FileSystemLeft
 * 
 * const other = await SF.linkStat("/tmp/other-link");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/linkStat
 * @namespace SF
 * 
 */
export declare const linkStat: <GenericPath extends string | URL>(path: GenericPath) => Promise<FileSystemLeft | E.Success<StatInfo>>;
