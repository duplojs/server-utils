import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeTextFile(
			path: string | URL,
			data: string,
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/writeTextFile/index.md}
 */
export const writeTextFile = implementFunction(
	"writeTextFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.writeFile(
				path,
				data,
				{ encoding: "utf-8" },
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path, data) => Deno
			.writeTextFile(
				path,
				data,
			)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
		BUN: (path, data) => Bun
			.file(path)
			.write(data)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
