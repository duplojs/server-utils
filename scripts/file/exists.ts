import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		exists<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/exists/index.md}
 */
export const exists = implementFunction(
	"exists",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;
			return fs.access(path)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path) => Deno
			.stat(path)
			.then(E.ok)
			.catch(E.fail),
		BUN: (path) => Bun.file(path)
			.exists()
			.then(
				(value) => value
					? E.ok()
					: E.fail(),
			)
			.catch(E.fail),
	},
);
