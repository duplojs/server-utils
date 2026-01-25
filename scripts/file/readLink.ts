import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readLink<
			GenericPath extends string | URL,
		>(
			path: GenericPath
		): Promise<E.EitherFail | E.EitherSuccess<string>>;
	}
}

/**
 * {@include file/readLink/index.md}
 */
export const readLink = implementFunction(
	"readLink",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readlink(
				path,
				{ encoding: "utf-8" },
			)
				.then(E.success)
				.catch(E.fail);
		},
		DENO: (path) => Deno
			.readLink(path)
			.then(E.success)
			.catch(E.fail),
	},
);
