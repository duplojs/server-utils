import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		move(
			fromPath: string | URL,
			toPath: string | URL,
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/move/index.md}
 */
export const move = implementFunction(
	"move",
	{
		NODE: async(fromPath, toPath) => {
			const fs = await nodeFileSystem.value;
			return fs.rename(
				fromPath,
				toPath,
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (fromPath, toPath) => Deno.rename(
			fromPath,
			toPath,
		)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);

