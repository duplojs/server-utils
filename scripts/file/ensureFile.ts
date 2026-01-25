import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		ensureFile<
			GenericPath extends string | URL,
		>(path: GenericPath): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/ensureFile/index.md}
 */
export const ensureFile = implementFunction(
	"ensureFile",
	{
		NODE: async(path: string | URL) => {
			const fs = await nodeFileSystem.value;

			return fs.open(path, "a")
				.then((fh) => fh.close())
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path: string | URL) => Deno.open(path, {
			write: true,
			create: true,
			append: true,
		})
			.then((fh) => void fh.close())
			.then(E.ok)
			.catch(E.fail),
	},
);
