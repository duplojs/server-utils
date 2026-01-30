import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeFile(
			path: string,
			data: Uint8Array,
		): Promise<FileSystemLeft<"write-file"> | E.Ok>;
	}
}

/**
 * {@include file/writeFile/index.md}
 */
export const writeFile = implementFunction(
	"writeFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.writeFile(
				path,
				data,
			)
				.then(E.ok)
				.catch((value) => E.left("file-system-write-file", value));
		},
		DENO: (path, data) => Deno
			.writeFile(
				path,
				data,
			)
			.then(E.ok)
			.catch((value) => E.left("file-system-write-file", value)),
		BUN: (path, data) => Bun
			.file(path)
			.write(data)
			.then(E.ok)
			.catch((value) => E.left("file-system-write-file", value)),
	},
);
