import { asyncPipe, E, innerPipe, Path, type Kind } from "@duplojs/utils";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { move } from "./move";
import { exists } from "./exists";
import { rename } from "./rename";
import { remove } from "./remove";
import { readDirectory } from "./readDirectory";
import { stat, type StatInfo } from "./stat";
import { walkDirectory } from "./walkDirectory";
import type { FileInterface } from "./fileInterface";
import type { UnknownInterface } from "./unknownInterface";
import type { FileSystemLeft } from "./types";
import { relocate } from "./relocate";

const folderInterfaceKind = createDuplojsServerUtilsKind("folderInterface");

export interface FolderInterface extends Kind<
	typeof folderInterfaceKind.definition
> {
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
 * {@include file/createFolderInterface/index.md}
 */
export function createFolderInterface(path: string): FolderInterface {
	function getName() {
		return Path.getBaseName(path);
	}

	function getParentPath() {
		return Path.getParentFolderPath(path);
	}

	function localRename(newName: string) {
		return asyncPipe(
			rename(path, newName),
			E.whenIsRight(
				innerPipe(
					createFolderInterface,
					E.success,
				),
			),
		);
	}

	function localRelocate(newParentPath: string) {
		return asyncPipe(
			relocate(path, newParentPath),
			E.whenIsRight(
				innerPipe(
					createFolderInterface,
					E.success,
				),
			),
		);
	}

	function localMove(newPath: string) {
		return asyncPipe(
			move(path, newPath),
			E.whenIsRight(
				() => E.success(
					createFolderInterface(newPath),
				),
			),
		);
	}

	function localExists() {
		return exists(path);
	}

	function localRemove() {
		return remove(path);
	}

	function localStat() {
		return stat(path);
	}

	function getChildren() {
		return readDirectory(path);
	}

	function walk() {
		return walkDirectory(path);
	}

	return folderInterfaceKind.addTo({
		path,
		getName,
		getParentPath,
		move: localMove,
		rename: localRename,
		exists: localExists,
		relocate: localRelocate,
		remove: localRemove,
		getChildren,
		stat: localStat,
		walk,
	});
}

/**
 * {@include file/isFolderInterface/index.md}
 */
export function isFolderInterface(
	input: unknown,
): input is FileInterface {
	return folderInterfaceKind.has(input);
}
