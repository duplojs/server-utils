import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readTextFile<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<FileSystemLeft | E.Success<string>>;
	}
}

/**
 * {@include file/readTextFile/index.md}
 */
export const readTextFile = implementFunction(
	"readTextFile",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readFile(path, { encoding: "utf-8" })
				.then(E.success)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path) => Deno
			.readTextFile(path)
			.then(E.success)
			.catch((value) => E.left("file-system", value)),
		BUN: (path) => Bun.file(path)
			.text()
			.then(E.success)
			.catch((value) => E.left("file-system", value)),
	},
);
