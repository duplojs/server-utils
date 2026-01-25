import { innerPipe, E, P, G } from "@duplojs/utils";
import { implementFunction, nodeFileSystem } from "@scripts/implementor";
import { type FileInterface, createFileInterface } from "./fileInterface";
import { type FolderInterface, createFolderInterface } from "./folderInterface";
import { createUnknownInterface, type UnknownInterface } from "./unknownInterface";

declare module "@scripts/implementor" {
	interface ServerUtilsFunction {
		walkDirectory<
			GenericPath extends string | URL,
		>(
			path: GenericPath,
		): Promise<
			E.EitherFail
			| E.EitherSuccess<
				Generator<FileInterface | FolderInterface | UnknownInterface>
			>>;
	}
}

/**
 * {@include file/walkDirectory/index.md}
 */
export const walkDirectory = implementFunction(
	"walkDirectory",
	{
		NODE: async(path) => {
			const fs = await nodeFileSystem.value;

			return fs.readdir(
				path,
				{
					recursive: true,
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
				.catch(E.fail);
		},
	},
);

