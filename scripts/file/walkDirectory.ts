import { innerPipe, E, P, G } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import { type FileInterface, createFileInterface } from "./fileInterface";
import { type FolderInterface, createFolderInterface } from "./folderInterface";
import { createUnknownInterface, type UnknownInterface } from "./unknownInterface";
import type { FileSystemLeft } from "./types";

interface WalkDirectoryParams {
	recursive?: boolean;
}

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		walkDirectory<
			GenericPath extends string,
		>(
			path: GenericPath,
			params?: WalkDirectoryParams,
		): Promise<
			FileSystemLeft<"walk-directory">
			| E.Success<
				Generator<FileInterface | FolderInterface | UnknownInterface>
			>
		>;
	}
}

/**
 * {@include file/walkDirectory/index.md}
 */
export const walkDirectory = implementFunction(
	"walkDirectory",
	{
		NODE: async(path, params) => {
			const fs = await nodeFileSystem.value;

			return fs.readdir(
				path,
				{
					recursive: params?.recursive ?? false,
					withFileTypes: true,
				},
			)
				.then(
					innerPipe(
						G.map(
							innerPipe(
								P.when(
									(dirent) => dirent.isFile(),
									({ parentPath, name }) => createFileInterface(
										`${parentPath}/${name}`,
									),
								),
								P.when(
									(dirent) => dirent.isDirectory(),
									({ parentPath, name }) => createFolderInterface(
										`${parentPath}/${name}`,
									),
								),
								P.otherwise(
									({ parentPath, name }) => createUnknownInterface(
										`${parentPath}/${name}`,
									),
								),
							),
						),
						E.success,
					),
				)
				.catch((value) => E.left("file-system-walk-directory", value));
		},
	},
);

