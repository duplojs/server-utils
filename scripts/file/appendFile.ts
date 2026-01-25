import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		appendFile(
			path: string | URL,
			data: Uint8Array,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/appendFile/index.md}
 */
export const appendFile = implementFunction(
	"appendFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.appendFile(
				path,
				data,
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path, data) => Deno.writeFile(
			path,
			data,
			{ append: true },
		)
			.then(E.ok)
			.catch(E.fail),
	},
);
