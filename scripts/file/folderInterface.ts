import { A, asyncPipe, E, instanceOf, isType, justReturn, pipe, S, when, type Kind } from "@duplojs/utils";
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

const folderInterfaceKind = createDuplojsServerUtilsKind("folderInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;

export interface FolderInterface extends Kind<
	typeof folderInterfaceKind.definition
> {
	name: string;
	path: string;
	getParentPath(): string;
	rename(newName: string): Promise<E.EitherFail | E.EitherSuccess<FolderInterface>>;
	exist(): Promise<E.EitherFail | E.EitherOk>;
	relocate(parentPath: string | URL): Promise<E.EitherFail | E.EitherSuccess<FolderInterface>>;
	remove(): Promise<E.EitherFail | E.EitherOk>;
	getChildren(): Promise<E.EitherFail | E.EitherSuccess<string[]>>;
	stat(): Promise<E.EitherFail | E.EitherSuccess<StatInfo>>;
	walk(): Promise<E.EitherFail | E.EitherSuccess<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}

/**
 * {@include file/createFolderInterface/index.md}
 */
export function createFolderInterface<
	GenericPath extends string | URL,
>(
	path: GenericPath,
): FolderInterface;

export function createFolderInterface(path: string | URL) {
	const localPath = pipe(
		path,
		when(
			instanceOf(URL),
			({ pathname }) => decodeURIComponent(pathname),
		),
		when(
			S.endsWith("/"),
			S.slice(0, -1),
		),
	);

	const name = pipe(
		localPath,
		S.split("/"),
		A.last,
		when(
			isType("undefined"),
			justReturn(""),
		),
	);

	function getParentPath() {
		return S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
	}

	function localRename(newName: string) {
		return asyncPipe(
			rename(localPath, newName),
			E.whenIsRight(
				() => pipe(
					getParentPath(),
					(parentPath) => `${parentPath}/${newName}`,
					createFolderInterface,
					E.success,
				),
			),
		);
	}

	function exist() {
		return exists(localPath);
	}

	function relocate(parentPath: string | URL) {
		const newPath = pipe(
			localPath,
			getParentPath,
			(localParentPath) => `${localParentPath}/${name}`,
		);
		return asyncPipe(
			parentPath,
			when(
				instanceOf(URL),
				({ pathname }) => decodeURIComponent(pathname),
			),
			(parentPath) => move(parentPath, newPath),
			E.whenIsRight(
				() => pipe(
					newPath,
					createFolderInterface,
					E.success,
				),
			),
		);
	}

	function localRemove() {
		return remove(localPath, { recursive: true });
	}

	function getChildren() {
		return readDirectory(localPath);
	}

	function localStat() {
		return stat(localPath);
	}

	function walk() {
		return walkDirectory(localPath);
	}

	return folderInterfaceKind.addTo({
		path: localPath,
		name,
		getParentPath,
		rename: localRename,
		exist,
		relocate,
		remove: localRemove,
		getChildren,
		stat: localStat,
		walk,
	});
}
