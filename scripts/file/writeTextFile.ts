import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeTextFile(
			path: string | URL,
			data: string,
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/writeTextFile/index.md}
 */
export const writeTextFile = implementFunction(
	"writeTextFile",
	{
		NODE: async(path, data) => {
			const fs = await nodeFileSystem.value;
			return fs.writeFile(
				path,
				data,
				{ encoding: "utf-8" },
			)
				.then(E.ok)
				.catch(E.fail);
		},
		DENO: (path, data) => Deno
			.writeTextFile(
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
