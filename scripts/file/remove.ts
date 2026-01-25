import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

interface RemoveDirectoryParams {
	recursive?: boolean;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		remove<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
			params?: RemoveDirectoryParams
		): Promise<E.EitherFail | E.EitherOk>;
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
					recursive: params?.recursive,
					force: true,
				},
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path, params) => Deno.remove(
			path,
			{
				recursive: params?.recursive,
			},
		)
			.then(E.ok)
			.catch(E.fail),
	},
);
