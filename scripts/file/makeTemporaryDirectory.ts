import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		makeTemporaryDirectory(prefix: string): Promise<E.EitherFail | E.EitherSuccess<string>>;
	}
}

/**
 * {@include file/makeTemporaryDirectory/index.md}
 */
export const makeTemporaryDirectory = implementFunction(
	"makeTemporaryDirectory",
	{
		NODE: async(prefix) => {
			const fs = await nodeFileSystem.value;
			return fs.mkdtemp(prefix)
				.then(E.success)
				.catch(E.fail);
		},
		DENO: (prefix) => Deno.makeTempDir({ prefix })
			.then(E.success)
			.catch(E.fail),
	},
);
