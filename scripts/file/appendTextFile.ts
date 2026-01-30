import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		appendTextFile(
			path: string,
			data: string,
		): Promise<FileSystemLeft<"append-text-file"> | E.Ok>;
	}
}

/**
 * {@include file/appendTextFile/index.md}
 */
export const appendTextFile = implementFunction(
	"appendTextFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.appendFile(
				path,
				data,
			)
				.then(E.ok)
				.catch((value) => E.left("file-system-append-text-file", value));
		},
		DENO: (path, data) => Deno.writeTextFile(
			path,
			data,
			{ append: true },
		)
			.then(E.ok)
			.catch((value) => E.left("file-system-append-text-file", value)),
	},
);
