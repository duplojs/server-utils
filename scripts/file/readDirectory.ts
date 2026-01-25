import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

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
		): Promise<E.EitherFail | E.EitherSuccess<string[]>>;
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
				.catch(E.fail);
		},
	},
);
