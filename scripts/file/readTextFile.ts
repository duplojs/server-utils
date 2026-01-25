import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readTextFile<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<E.EitherFail | E.EitherSuccess<string>>;
	}
}

/**
 * {@include file/readTextFile/index.md}
 */
export const readTextFile = implementFunction(
	"readTextFile",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readFile(path, { encoding: "utf-8" })
				.then(E.success)
				.catch(E.fail);
		},
		DENO: (path) => Deno
			.readTextFile(path)
			.then(E.success)
			.catch(E.fail),
		BUN: (path) => Bun.file(path)
			.text()
			.then(E.success)
			.catch(E.fail),
	},
);
