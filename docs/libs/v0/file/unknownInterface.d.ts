import { type E, type Kind } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileSystemLeft } from "./types";
declare const unknownInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/unknownInterface", unknown>>;
export interface UnknownInterface extends Kind<typeof unknownInterfaceKind.definition> {
    name: string;
    path: string;
    getParentPath(): string;
    stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
    exist(): Promise<FileSystemLeft | E.Ok>;
}
/**
 * Create an interface for an unknown path type.
 * 
 * Return an object that exposes name, parent path, and basic checks. (`getParentFolder()`, `exist()`, `stat()`)
 * 
 * ```ts
 * const entry = SF.createUnknownInterface("/tmp/entry");
 * const name = entry.name;
 * 
 * await entry.exist();
 * await entry.stat();
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/unknownInterface
 * @namespace SF
 * 
 */
export declare function createUnknownInterface<GenericPath extends string | URL>(path: GenericPath): UnknownInterface;
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
