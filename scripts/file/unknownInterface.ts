import { A, instanceOf, isType, justReturn, pipe, S, when, type E, type Kind } from "@duplojs/utils";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { stat, type StatInfo } from "./stat";
import { exists } from "./exists";
import type { FileSystemLeft } from "./types";

const unknownInterfaceKind = createDuplojsServerUtilsKind("unknownInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;

export interface UnknownInterface extends Kind<
	typeof unknownInterfaceKind.definition
> {
	name: string;
	path: string;
	getParentPath(): string;
	stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
	exist(): Promise<FileSystemLeft | E.Ok>;
}

/**
 * {@include file/createUnknownInterface/index.md}
 */
export function createUnknownInterface<
	GenericPath extends string | URL,
>(
	path: GenericPath,
): UnknownInterface;

export function createUnknownInterface(path: string | URL) {
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

	function localStat() {
		return stat(localPath);
	}

	function exist() {
		return exists(localPath);
	}

	return unknownInterfaceKind.addTo({
		path: localPath,
		name,
		getParentPath,
		stat: localStat,
		exist,
	});
}
