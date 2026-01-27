import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		exists<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/exists/index.md}
 */
export const exists = implementFunction(
	"exists",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.access(path)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path) => Deno
			.stat(path)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
		BUN: (path) => Bun.file(path)
			.exists()
			.then(
				(value) => value
					? E.ok()
					: E.left("file-system", new Error("Path does not exist")),
			)
			.catch((value) => E.left("file-system", value)),
	},
);
