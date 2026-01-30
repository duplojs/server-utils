import { type E, type Kind } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileSystemLeft } from "./types";
declare const unknownInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/unknownInterface", unknown>>;
export interface UnknownInterface extends Kind<typeof unknownInterfaceKind.definition> {
    path: string;
    getName(): string | null;
    getParentPath(): string | null;
    stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
    exist(): Promise<FileSystemLeft<"exists"> | E.Ok>;
}
/**
 * Create an interface for an unknown path type.
 * 
 * Return an object that exposes name, parent path, and basic checks. (`getName()`, `getParentPath()`, `exist()`, `stat()`)
 * 
 * ```ts
 * import { SF } from "..";
 * 
 * const entry = SF.createUnknownInterface("/tmp/entry");
 * const name = entry.getName();
 * // name: string | null
 * 
 * const parent = entry.getParentPath();
 * // parent: string | null
 * 
 * await entry.exist();
 * await entry.stat();
 * 
 * const otherEntry = SF.createUnknownInterface("/tmp/another-entry");
 * await otherEntry.stat();
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/unknownInterface
 * @namespace SF
 * 
 */
export declare function createUnknownInterface(path: string): UnknownInterface;
/**
 * Check whether a value is an UnknownInterface.
 * 
 * Return true when the value was created by createUnknownInterface.
 * 
 * ```ts
 * const entry = SF.createUnknownInterface("/tmp/entry");
 * 
 * if (SF.isUnknownInterface(entry)) {
 * 	// entry: UnknownInterface
 * 	await entry.stat();
 * }
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/unknownInterface
 * @namespace SF
 * 
 */
export declare function isUnknownInterface(input: unknown): input is UnknownInterface;
export {};
