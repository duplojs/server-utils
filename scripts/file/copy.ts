import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		copy(
			fromPath: string | URL,
			toPath: string | URL,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/copy/index.md}
 */
export const copy = implementFunction(
	"copy",
	{
		NODE: async(fromPath, toPath) => {
			const fs = await nodeFileSystem.value;
			return fs.cp(
				fromPath,
				toPath,
				{ recursive: true },
			)
				.then(E.ok)
				.catch(E.fail);
		},
	},
);
