import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

interface MakeDirectoryParams {
	recursive?: boolean;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		makeDirectory<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
			params?: MakeDirectoryParams
		): Promise<FileSystemLeft | E.Ok>;
	}
}

/**
 * {@include file/makeDirectory/index.md}
 */
export const makeDirectory = implementFunction(
	"makeDirectory",
	{
		NODE: async(path, params) => {
			const fs = await nodeFileSystem.value;
			return fs.mkdir(
				path,
				{
					recursive: params?.recursive,
				},
			)
				.then(E.ok)
				.catch((value) => E.left("file-system", value));
		},
		DENO: (path, params) => Deno.mkdir(
			path,
			{
				recursive: params?.recursive,
			},
		)
			.then(E.ok)
			.catch((value) => E.left("file-system", value)),
	},
);
