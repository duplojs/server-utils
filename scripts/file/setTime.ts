import { D, E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

interface SetTimeParams {
	accessTime: D.TheDate;
	modifiedTime: D.TheDate;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		setTime(
			path: string | URL,
			params: SetTimeParams
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/setTime/index.md}
 */
export const setTime = implementFunction(
	"setTime",
	{
		NODE: async(path, { accessTime, modifiedTime }) => {
			const fs = await nodeFileSystem.value;
			return fs.utimes(
				path,
				D.toTimestamp(accessTime),
				D.toTimestamp(modifiedTime),
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path, { accessTime, modifiedTime }) => Deno
			.utime(
				path,
				D.toTimestamp(accessTime),
				D.toTimestamp(modifiedTime),
			)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
