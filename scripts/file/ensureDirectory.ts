import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		ensureDirectory<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/ensureDirectory/index.md}
 */
export const ensureDirectory = implementFunction(
	"ensureDirectory",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.mkdir(
				path,
				{
					recursive: true,
				},
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path) => Deno.mkdir(
			path,
			{
				recursive: true,
			},
		)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
