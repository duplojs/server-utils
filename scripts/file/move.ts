import { E } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		move(
			fromPath: string,
			toPath: string,
		): Promise<FileSystemLeft<"move"> | E.Ok>;
	}
}

/**
 * {@include file/move/index.md}
 */
export const move = implementFunction(
	"move",
	{
		NODE: async(fromPath, toPath) => {
			const fs = await import("node:fs/promises");
			return fs.rename(
				fromPath,
				toPath,
			)
				.then(E.ok)
				.catch((value) => E.left("file-system-move", value));
		},
		DENO: (fromPath, toPath) => Deno.rename(
			fromPath,
			toPath,
		)
			.then(E.ok)
			.catch((value) => E.left("file-system-move", value)),
	},
);

