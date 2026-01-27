import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		ensureFile<
			GenericPath extends string | URL,
		>(path: GenericPath): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/ensureFile/index.md}
 */
export const ensureFile = implementFunction(
	"ensureFile",
	{
		NODE: async(path: string | URL) => {
			const fs = await nodeFileSystem.value;

			return fs.open(path, "a")
				.then((fh) => fh.close())
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path: string | URL) => Deno.open(path, {
			write: true,
			create: true,
			append: true,
		})
			.then((fh) => void fh.close())
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
