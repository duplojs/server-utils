import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		move(
			fromPath: string | URL,
			toPath: string | URL,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/move/index.md}
 */
export const move = implementFunction(
	"move",
	{
		NODE: async(fromPath, toPath) => {
			const fs = await nodeFileSystem.value;
			return fs.rename(
				fromPath,
				toPath,
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (fromPath, toPath) => Deno.rename(
			fromPath,
			toPath,
		)
			.then(E.ok)
			.catch(E.fail),
	},
);

