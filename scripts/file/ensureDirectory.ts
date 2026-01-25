import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		ensureDirectory<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<E.EitherFail | E.EitherOk>;
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
				.catch(E.fail);
		},
		DENO: (path) => Deno.mkdir(
			path,
			{
				recursive: true,
			},
		)
			.then(E.ok)
			.catch(E.fail),
	},
);
