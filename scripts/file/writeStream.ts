import { E } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		writeStream(
			path: string,
			source: AsyncIterable<Uint8Array>,
		): Promise<FileSystemLeft<"write-stream"> | E.Ok>;
	}
}

/**
 * {@include file/writeStream/index.md}
 */
export const writeStream = implementFunction(
	"writeStream",
	{
		NODE: async(path, source) => {
			try {
				const fs = await import("node:fs");
				const { Readable, promises } = await import("node:stream");

				const readable = Readable.from(source);
				const writable = fs.createWriteStream(path);

				await promises.pipeline(readable, writable);

				return E.ok();
			} catch (value) {
				return E.left("file-system-write-stream", value);
			}
		},
		DENO: async(path, source) => {
			try {
				const file = await Deno.create(path);

				try {
					for await (const chunk of source) {
						await file.write(chunk);
					}
				} finally {
					file.close();
				}

				return E.ok();
			} catch (value) {
				return E.left("file-system-write-stream", value);
			}
		},
		BUN: async(path, source) => {
			try {
				const writer = Bun.file(path).writer();

				for await (const chunk of source) {
					writer.write(chunk);
				}

				await writer.end();

				return E.ok();
			} catch (value) {
				return E.left("file-system-write-stream", value);
			}
		},
	},
);
