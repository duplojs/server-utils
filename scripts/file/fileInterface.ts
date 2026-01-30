import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { asyncPipe, type Kind, E, mimeType, Path, innerPipe } from "@duplojs/utils";
import { rename } from "./rename";
import { exists } from "./exists";
import { move } from "./move";
import { remove } from "./remove";
import { type StatInfo, stat } from "./stat";
import type { FileSystemLeft } from "./types";
import { relocate } from "./relocate";

const fileInterfaceKind = createDuplojsServerUtilsKind("fileInterface");

export interface FileInterface extends Kind<
	typeof fileInterfaceKind.definition
> {
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
 * {@include file/createFileInterface/index.md}
 */
export function createFileInterface(path: string): FileInterface {
	function getName() {
		return Path.getBaseName(path);
	}

	function getExtension() {
		return Path.getExtensionName(path);
	}

	function getMimeType() {
		const extension = getExtension();

		if (!extension) {
			return null;
		}

		return mimeType.get(extension) ?? null;
	}

	function getParentPath() {
		return Path.getParentFolderPath(path);
	}

	function localExists() {
		return exists(path);
	}

	function localRename(newName: string) {
		return asyncPipe(
			rename(path, newName),
			E.whenIsRight(
				innerPipe(
					createFileInterface,
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
					createFileInterface,
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
					createFileInterface(newPath),
				),
			),
		);
	}

	function localRemove() {
		return remove(path);
	}

	function localStat() {
		return stat(path);
	}

	return fileInterfaceKind.addTo({
		path,
		getName,
		getExtension,
		getMimeType,
		getParentPath,
		rename: localRename,
		exists: localExists,
		relocate: localRelocate,
		remove: localRemove,
		move: localMove,
		stat: localStat,
	});
}

/**
 * {@include file/isFileInterface/index.md}
 */
export function isFileInterface(
	input: unknown,
): input is FileInterface {
	return fileInterfaceKind.has(input);
}
