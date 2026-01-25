import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		realPath<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<E.EitherFail | E.EitherSuccess<string>>;
	}
}

/**
 * {@include file/realPath/index.md}
 */
export const realPath = implementFunction(
	"realPath",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.realpath(path)
				.then(E.success)
				.catch(E.fail);
		},
		DENO: (path) => Deno
			.realPath(path)
			.then(E.success)
			.catch(E.fail),
	},
);
