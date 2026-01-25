import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

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
		): Promise<E.EitherFail | E.EitherOk>;
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
				.catch(E.fail);
		},
		DENO: (path, params) => Deno.mkdir(
			path,
			{
				recursive: params?.recursive,
			},
		)
			.then(E.ok)
			.catch(E.fail),
	},
);
