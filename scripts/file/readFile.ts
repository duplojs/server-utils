import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readFile<
			GenericPath extends string | URL,
		>(
			path: GenericPath
		): Promise<E.EitherFail | E.EitherSuccess<Uint8Array>>;
	}
}

/**
 * {@include file/readFile/index.md}
 */
export const readFile = implementFunction(
	"readFile",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.readFile(path)
				.then(E.success)
				.catch(E.fail);
		},
		DENO: (path) => Deno
			.readFile(path)
			.then(E.success)
			.catch(E.fail),
		BUN: (path) => Bun.file(path)
			.bytes()
			.then(E.success)
			.catch(E.fail),
	},
);
