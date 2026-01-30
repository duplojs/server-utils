import { E, Path } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import type { FileSystemLeft } from "./types";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		relocate(
			fromPath: string,
			toPath: string,
		): Promise<FileSystemLeft<"relocate"> | E.Success<string>>;
	}
}

/**
 * {@include file/relocate/index.md}
 */
export const relocate = implementFunction(
	"relocate",
	{
		NODE: async(fromPath, newParentPath) => {
			const fs = await nodeFileSystem.value;
			const baseName = Path.getBaseName(fromPath);

			if (!baseName) {
				return E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`));
			}

			const newPath = Path.resolveRelative([newParentPath, baseName]);

			return fs.rename(
				fromPath,
				newPath,
			)
				.then(() => E.success(newPath))
				.catch((value) => E.left("file-system-relocate", value));
		},
		DENO: (fromPath, newParentPath) => {
			const baseName = Path.getBaseName(fromPath);

			if (!baseName) {
				return Promise.resolve(E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`)));
			}

			const newPath = Path.resolveRelative([newParentPath, baseName]);

			return Deno.rename(
				fromPath,
				newPath,
			)
				.then(() => E.success(newPath))
				.catch((value) => E.left("file-system-relocate", value));
		},
	},
);
