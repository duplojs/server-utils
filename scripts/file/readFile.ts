import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readFile<
			GenericPath extends string,
		>(
			path: GenericPath
		): Promise<FileSystemLeft<"read-file"> | E.Success<Uint8Array>>;
	}
}

/**
 * {@include file/readFile/index.md}
 */
export const readFile = implementFunction(
	"readFile",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readFile(path)
				.then(E.success)
				.catch((value) => E.left("file-system-read-file", value));
		},
		DENO: (path) => Deno
			.readFile(path)
			.then(E.success)
			.catch((value) => E.left("file-system-read-file", value)),
		BUN: (path) => Bun.file(path)
			.bytes()
			.then(E.success)
			.catch((value) => E.left("file-system-read-file", value)),
	},
);
