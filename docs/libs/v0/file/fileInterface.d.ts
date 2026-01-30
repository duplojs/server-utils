import { type Kind, E } from "@duplojs/utils";
import { type StatInfo } from "./stat";
import type { FileSystemLeft } from "./types";
declare const fileInterfaceKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/fileInterface", unknown>>;
export interface FileInterface extends Kind<typeof fileInterfaceKind.definition> {
    path: string;
    getName(): string | null;
    getMimeType(): string | null;
    getExtension(): string | null;
    getParentPath(): string | null;
    rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FileInterface>>;
    relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FileInterface>>;
    move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FileInterface>>;
    exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
    remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
    stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
}
/**
 * Create a file interface with helper methods.
 * 
 * Return an object that exposes name, extension, and helper actions. (`getName()`, `getExtension()`, `getMimeType()`, `getParentPath()`, `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `stat()`)
 * 
 * ```ts
 * import { SF } from "..";
 * 
 * const file = SF.createFileInterface("/tmp/example.json");
 * const name = file.getName();
 * // name: string | null
 * 
 * const mime = file.getMimeType();
 * // mime: string | null
 * 
 * const noExtension = SF.createFileInterface("/tmp/README");
 * const extension = noExtension.getExtension();
 * // extension: string | null
 * 
 * await file.rename("next.json");
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/fileInterface
 * 
 * @namespace SF
 * 
 */
export declare function createFileInterface(path: string): FileInterface;
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
