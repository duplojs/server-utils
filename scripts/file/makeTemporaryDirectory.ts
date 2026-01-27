import { E } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		makeTemporaryDirectory(prefix: string): Promise<FileSystemLeft | E.Success<string>>;
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
				.catch((value) => E.left("file-system", value));
		},
		DENO: (prefix) => Deno.makeTempDir({ prefix })
			.then(E.success)
			.catch((value) => E.left("file-system", value)),
	},
);
