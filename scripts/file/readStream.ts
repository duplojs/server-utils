import { implementFunction } from "@scripts/implementor";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		readStream<
			GenericPath extends string,
		>(
			path: GenericPath,
		): AsyncGenerator<Uint8Array>;
	}
}

/**
 * {@include file/readStream/index.md}
 */
export const readStream = implementFunction(
	"readStream",
	{
		NODE: async function *(path) {
			const fs = await import("node:fs");
			const stream = fs.createReadStream(path);

			for await (const chunk of stream) {
				yield new Uint8Array(chunk);
			}
		},
		DENO: async function *(path) {
			const file = await Deno.open(path);

			try {
				const stream = file.readable;
				for await (const chunk of stream) {
					yield chunk;
				}
			} finally {
				file.close();
			}
		},
		BUN: async function *(path) {
			const stream = Bun
				.file(path)
				.stream();

			for await (const chunk of stream) {
				yield chunk;
			}
		},
	},
);
