import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeFile(
			path: string | URL,
			data: Uint8Array,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/writeFile/index.md}
 */
export const writeFile = implementFunction(
	"writeFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.writeFile(
				path,
				data,
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path, data) => Deno
			.writeFile(
				path,
				data,
			)
			.then(E.ok)
			.catch(E.fail),
		BUN: (path, data) => Bun
			.file(path)
			.write(data)
			.then(E.ok)
			.catch(E.fail),
	},
);
