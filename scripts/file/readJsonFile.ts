import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readJsonFile<
			GenericOutput extends unknown,
			GenericPath extends string | URL = string | URL,
		>(
			path: GenericPath,
		): Promise<FileSystemLeft | E.Success<GenericOutput>>;
	}
}

/**
 * {@include file/readJsonFile/index.md}
 */
export const readJsonFile = implementFunction(
	"readJsonFile",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readFile(path, { encoding: "utf-8" })
				.then(JSON.parse)
				.then(E.success)
				.catch((value) => E.left("file-system", value));
		},

		DENO: (path) => Deno.readTextFile(path)
			.then(JSON.parse)
			.then(E.success)
			.catch((value) => E.left("file-system", value)),

		BUN: (path) => Bun.file(path)
			.text()
			.then(JSON.parse)
			.then(E.success)
			.catch((value) => E.left("file-system", value)),
	},
);
