import * as EE from "@duplojs/utils/either";
import * as DD from "@duplojs/utils/date";
import type { FileSystemLeft } from "./types";
export interface StatInfo {
    /** Type of entry */
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
    /** Size in bytes */
    sizeBytes: number;
    /** Timestamps */
    modifiedAt: DD.TheDate | null;
    accessedAt: DD.TheDate | null;
    createdAt: DD.TheDate | null;
    changedAt: DD.TheDate | null;
    /** Unix/FS identifiers */
    deviceId: number;
    inode: number | null;
    permissionsMode: number | null;
    hardLinkCount: number | null;
    /** Ownership */
    ownerUserId: number | null;
    ownerGroupId: number | null;
    /** Special device id (if file is a device) */
    specialDeviceId: number | null;
    /** FS allocation */
    ioBlockSize: number | null;
    allocatedBlockCount: number | null;
    /** Special file kinds */
    isBlockDevice: boolean | null;
    isCharacterDevice: boolean | null;
    isFifo: boolean | null;
    isSocket: boolean | null;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        stat<GenericPath extends string>(path: GenericPath): Promise<FileSystemLeft<"stat"> | EE.Success<StatInfo>>;
    }
}
/**
 * Read metadata about a file or directory.
 * 
 * Return a StatInfo object with size, timestamps, and type information.
 * 
 * ```ts
 * const info = await SF.stat("/tmp/file.txt");
 * // info: E.Success<StatInfo> | SF.FileSystemLeft<"stat">
 * 
 * const dirInfo = await SF.stat("/tmp");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/stat
 * @namespace SF
 * 
 */
export declare const stat: <GenericPath extends string>(path: GenericPath) => Promise<FileSystemLeft<"stat"> | EE.Success<StatInfo>>;
