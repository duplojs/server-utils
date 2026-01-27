import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		copy(
			fromPath: string | URL,
			toPath: string | URL,
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/copy/index.md}
 */
export const copy = implementFunction(
	"copy",
	{
		NODE: async(fromPath, toPath) => {
			const fs = await nodeFileSystem.value;
			return fs.cp(
				fromPath,
				toPath,
				{ recursive: true },
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
	},
);
