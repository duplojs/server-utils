import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { mimeType as mimeTypeMap, type SupportedMimeType, isSupportedExtensionFile, type SupportedExtensionFile } from "./mimeType";
import { A, asyncPipe, forward, instanceOf, isType, justReturn, type Kind, P, pipe, S, when, whenElse, E } from "@duplojs/utils";
import { rename } from "./rename";
import { exists } from "./exists";
import { move } from "./move";
import { remove } from "./remove";
import { type StatInfo, stat } from "./stat";

const fileInterfaceKind = createDuplojsServerUtilsKind("fileInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;

export interface FileInterface extends Kind<
	typeof fileInterfaceKind.definition
> {
	name: string;
	path: string;
	mimeType: SupportedMimeType | null;
	extension: SupportedExtensionFile | null;
	getParentPath(): string;
	rename(newName: string): Promise<E.EitherFail | E.EitherSuccess<FileInterface>>;
	exist(): Promise<E.EitherFail | E.EitherOk>;
	relocate(parentPath: string | URL): Promise<E.EitherFail | E.EitherSuccess<FileInterface>>;
	remove(): Promise<E.EitherFail | E.EitherOk>;
	stat(): Promise<E.EitherFail | E.EitherSuccess<StatInfo>>;
}

/**
 * {@include file/createFileInterface/index.md}
 */
export function createFileInterface<
	GenericPath extends string | URL,
>(
	path: GenericPath,
): FileInterface;

export function createFileInterface(path: string | URL) {
	const localPath = pipe(
		path,
		when(
			instanceOf(URL),
			({ pathname }) => decodeURIComponent(pathname),
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

	const extension = pipe(
		name,
		S.split("."),
		A.last,
		P.when(
			isType("string"),
			whenElse(
				isSupportedExtensionFile,
				forward,
				justReturn(null),
			),
		),
		P.otherwise(justReturn(null)),
	);

	const mimeType = extension
		? mimeTypeMap.get(extension)
		: null;

	function getParentPath() {
		return S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
	}

	function localRename(newName: string) {
		return asyncPipe(
			rename(localPath, newName),
			E.whenIsRight(
				() => pipe(
					getParentPath(),
					(parentPath) => createFileInterface(`${parentPath}/${newName}`),
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
					createFileInterface,
					E.success,
				),
			),
		);
	}

	function localRemove() {
		return remove(localPath);
	}

	function localStat() {
		return stat(localPath);
	}

	return fileInterfaceKind.addTo({
		extension,
		name,
		path: localPath,
		mimeType,
		getParentPath,
		rename: localRename,
		exist,
		relocate,
		remove: localRemove,
		stat: localStat,
	});
}
