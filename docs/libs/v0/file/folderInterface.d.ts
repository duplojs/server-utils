import { E, type Kind } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileInterface } from "./fileInterface";
import type { UnknownInterface } from "./unknownInterface";
import type { FileSystemLeft } from "./types";
declare const folderInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/folderInterface", unknown>>;
export interface FolderInterface extends Kind<typeof folderInterfaceKind.definition> {
    name: string;
    path: string;
    getParentPath(): string;
    rename(newName: string): Promise<FileSystemLeft | E.Success<FolderInterface>>;
    exist(): Promise<FileSystemLeft | E.Ok>;
    relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FolderInterface>>;
    remove(): Promise<FileSystemLeft | E.Ok>;
    getChildren(): Promise<FileSystemLeft | E.Success<string[]>>;
    stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
    walk(): Promise<FileSystemLeft | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
/**
 * Create a folder interface with helper methods.
 * 
 * Return an object that exposes folder metadata and helper operations. (`getParentFolder()`, `rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `stat()`, `getChildren()`, `walk()`)
 * 
 * ```ts
 * const folder = SF.createFolderInterface("/tmp/project");
 * const parent = folder.getParentPath();
 * 
 * await folder.getChildren();
 * await folder.walk();
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/folderInterface
 * @namespace SF
 * 
 */
export declare function createFolderInterface<GenericPath extends string | URL>(path: GenericPath): FolderInterface;
/**
 * Check whether a value is a FolderInterface.
 * 
 * Return true when the value was created by createFolderInterface.
 * 
 * ```ts
 * const folder = SF.createFolderInterface("/tmp/project");
 * 
 * if (SF.isFolderInterface(folder)) {
 * 	// folder: FolderInterface
 * 	await folder.getChildren();
 * }
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/folderInterface
 * @namespace SF
 * 
 */
export declare function isFolderInterface(input: unknown): input is FileInterface;
export {};
