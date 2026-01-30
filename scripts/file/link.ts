import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		link(
			existingPath: string,
			newPath: string,
		): Promise<FileSystemLeft<"link"> | E.Ok>;
	}
}

/**
 * {@include file/link/index.md}
 */
export const link = implementFunction(
	"link",
	{
		NODE: async(existingPath, newPath) => {
			const fs = await nodeFileSystem.value;
			return fs.link(
				existingPath,
				newPath,
			)
				.then(E.ok)
				.catch((value) => E.left("file-system-link", value));
		},
		DENO: (existingPath, newPath) => Deno
			.link(
				existingPath,
				newPath,
			)
			.then(E.ok)
			.catch((value) => E.left("file-system-link", value)),
	},
);
