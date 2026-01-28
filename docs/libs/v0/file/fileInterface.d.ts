import { type SupportedMimeType, type SupportedExtensionFile } from "./mimeType";
import { type Kind, E } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileSystemLeft } from "./types";
declare const fileInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/fileInterface", unknown>>;
export interface FileInterface extends Kind<typeof fileInterfaceKind.definition> {
    name: string;
    path: string;
    mimeType: SupportedMimeType | null;
    extension: SupportedExtensionFile | null;
    getParentPath(): string;
    rename(newName: string): Promise<FileSystemLeft | E.Success<FileInterface>>;
    exist(): Promise<FileSystemLeft | E.Ok>;
    relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FileInterface>>;
    remove(): Promise<FileSystemLeft | E.Ok>;
    stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
}
/**
 * Create a file interface with helper methods.
 * 
 * Return an object that exposes name, extension, and common file actions. (`getParentFolder()`, `rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `stat()`)
 * 
 * ```ts
 * const file = SF.createFileInterface("/tmp/example.json");
 * const name = file.name;
 * 
 * await file.rename("next.json");
 * await file.stat();
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/fileInterface
 * 
 * @namespace SF
 * 
 */
export declare function createFileInterface<GenericPath extends string | URL>(path: GenericPath): FileInterface;
/**
 * Check whether a value is a FileInterface.
 * 
 * Return true when the value was created by createFileInterface.
 * 
 * ```ts
 * const file = SF.createFileInterface("/tmp/example.txt");
 * 
 * if (SF.isFileInterface(file)) {
 * 	// file: FileInterface
 * 	file.getParentPath();
 * }
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/fileInterface
 * @namespace SF
 * 
 */
export declare function isFileInterface(input: unknown): input is FileInterface;
export {};
