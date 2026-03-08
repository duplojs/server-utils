import { E, Path } from "@duplojs/utils";
import { implementFunction } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		makeTemporaryFile(prefix: string, suffix?: string): Promise<FileSystemLeft<"make-temporary-file"> | E.Success<string>>;
	}
}

/**
 * {@include file/makeTemporaryFile/index.md}
 */
export const makeTemporaryFile = implementFunction(
	"makeTemporaryFile",
	{
		NODE: async(prefix, suffix) => {
			const fs = await import("node:fs/promises");
			const os = await import("node:os");
			const crypto = await import("node:crypto");

			const fileTemporaryPath = Path.resolveRelative([
				os.tmpdir(),
				`${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
			]);
			return fs.open(fileTemporaryPath, "wx")
				.then((fh) => fh.close())
				.then(() => E.success(fileTemporaryPath))
				.catch((value) => E.left("file-system-make-temporary-file", value));
		},
		DENO: (prefix, suffix) => Deno.makeTempFile({
			prefix,
			suffix,
		})
			.then(E.success)
			.catch((value) => E.left("file-system-make-temporary-file", value)),
	},
);
