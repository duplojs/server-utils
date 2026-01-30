import { E, instanceOf, pipe, when } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		truncate<
			GenericPath extends string,
		>(
			path: GenericPath,
			size?: number,
		): Promise<FileSystemLeft<"truncate"> | E.Ok>;
	}
}

/**
 * {@include file/truncate/index.md}
 */
export const truncate = implementFunction(
	"truncate",
	{
		NODE: async(path, size) => {
			const fs = await nodeFileSystem.value;
			return fs.truncate(path, size)
				.then(E.ok)
				.catch((value) => E.left("file-system-truncate", value));
		},
		DENO: (path: string, size) => pipe(
			path,
			when(
				instanceOf(URL),
				({ pathname }) => decodeURIComponent(pathname),
			),
			(stringPath) => Deno
				.truncate(stringPath, size)
				.then(E.ok)
				.catch((value) => E.left("file-system-truncate", value)),
		),
	},
);
