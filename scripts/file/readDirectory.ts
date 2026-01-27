import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

interface ReadDirectoryParams {
	recursive?: true;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readDirectory<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
			params?: ReadDirectoryParams,
		): Promise<FileSystemLeft | E.Success<string[]>>;
	}
}

/**
 * {@include file/readDirectory/index.md}
 */
export const readDirectory = implementFunction(
	"readDirectory",
	{
		NODE: async(path, params) => {
			const fs = await nodeFileSystem.value;

			return fs.readdir(path, { recursive: params?.recursive })
				.then(E.success)
				.catch((value) => E.left("file-system", value));
		},
	},
);
