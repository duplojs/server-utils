import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		realPath<
			GenericPath extends string,
		>(
			path: GenericPath,
		): Promise<FileSystemLeft<"real-path"> | E.Success<string>>;
	}
}

/**
 * {@include file/realPath/index.md}
 */
export const realPath = implementFunction(
	"realPath",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.realpath(path)
				.then(E.success)
				.catch((value) => E.left("file-system-real-path", value));
		},
		DENO: (path) => Deno
			.realPath(path)
			.then(E.success)
			.catch((value) => E.left("file-system-real-path", value)),
	},
);
