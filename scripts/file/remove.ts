import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

interface RemoveDirectoryParams {
	recursive?: boolean;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		remove<
			GenericPath extends string,
		>(
			path: GenericPath,
			params?: RemoveDirectoryParams
		): Promise<FileSystemLeft<"remove"> | E.Ok>;
	}
}

/**
 * {@include file/remove/index.md}
 */
export const remove = implementFunction(
	"remove",
	{
		NODE: async(path, params) => {
			const fs = await nodeFileSystem.value;
			return fs.rm(
				path,
				{
					recursive: params?.recursive ?? false,
					force: true,
				},
			)
				.then(E.ok)
				.catch((value) => E.left("file-system-remove", value));
		},
		DENO: (path, params) => Deno.remove(
			path,
			{
				recursive: params?.recursive,
			},
		)
			.then(E.ok)
			.catch((value) => E.left("file-system-remove", value)),
	},
);
