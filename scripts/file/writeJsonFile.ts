import { asyncPipe, E, pipe } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";

interface WriteJsonFile {
	space?: number;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeJsonFile(
			path: string | URL,
			data: unknown,
			params?: WriteJsonFile
		): Promise<E.EitherFail | E.EitherOk>;
	}
}

/**
 * {@include file/writeJsonFile/index.md}
 */
export const writeJsonFile = implementFunction(
	"writeJsonFile",
	{
		NODE: async(path, data, params) => {
			const fs = await nodeFileSystem.value;
			return pipe(
				E.safeCallback(
					() => JSON.stringify(
						data,
						null,
						params?.space,
					),
				),
				E.whenIsRight(
					(value) => fs.writeFile(
						path,
						value,
						{ encoding: "utf-8" },
					)
						.then(E.ok)
						.catch(E.fail),
				),
				E.whenIsLeft(
					E.fail,
				),
			);
		},
		DENO: (path, data, params) => asyncPipe(
			E.safeCallback(
				() => JSON.stringify(
					data,
					null,
					params?.space,
				),
			),
			E.whenIsRight(
				(value) => Deno.writeTextFile(
					path,
					value,
				)
					.then(E.ok)
					.catch(E.fail),
			),
			E.whenIsLeft(
				E.fail,
			),
		),
		BUN: (path, data, params) => asyncPipe(
			E.safeCallback(
				() => JSON.stringify(
					data,
					null,
					params?.space,
				),
			),
			E.whenIsRight(
				(value) => Bun.file(path)
					.write(value)
					.then(E.ok)
					.catch(E.fail),
			),
			E.whenIsLeft(
				E.fail,
			),
		),
	},
);
