import { E, type Kind } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileInterface } from "./fileInterface";
import type { UnknownInterface } from "./unknownInterface";
import type { FileSystemLeft } from "./types";
declare const folderInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/folderInterface", unknown>>;
export interface FolderInterface extends Kind<typeof folderInterfaceKind.definition> {
    path: string;
    getName(): string | null;
    getParentPath(): string | null;
    rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FolderInterface>>;
    exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
    relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FolderInterface>>;
    move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FolderInterface>>;
    remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
    getChildren(): Promise<FileSystemLeft<"read-directory"> | E.Success<string[]>>;
    stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
    walk(): Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
/**
 * Create a folder interface with helper methods.
 * 
 * Return an object that exposes folder metadata and helper operations. (`getName()`, `getParentPath()`, `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `stat()`, `getChildren()`, `walk()`)
 * 
 * ```ts
 * import { SF } from "..";
 * 
 * const folder = SF.createFolderInterface("/tmp/project");
 * const name = folder.getName();
 * // name: string | null
 * 
 * const parent = folder.getParentPath();
 * // parent: string | null
 * 
 * await folder.getChildren();
 * 
 * const otherFolder = SF.createFolderInterface("/tmp/archive");
 * await otherFolder.walk();
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/folderInterface
 * @namespace SF
 * 
 */
export declare function createFolderInterface(path: string): FolderInterface;
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
