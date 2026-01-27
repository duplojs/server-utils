import { E, instanceOf } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		link(
			existingPath: string | URL,
			newPath: string | URL,
		): Promise<FileSystemLeft | E.Ok>;
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
				.catch((value) => E.left("file-system", value));
		},
		DENO: (existingPath, newPath) => Deno
			.link(
				instanceOf(existingPath, URL)
					? decodeURIComponent(existingPath.pathname)
					: existingPath,
				instanceOf(newPath, URL)
					? decodeURIComponent(newPath.pathname)
					: newPath,
			)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
