import { SF } from "@duplojs/server-utils";
import { E, type ExpectType, G, unwrap } from "@duplojs/utils";

const folder = SF.createFolderInterface("/tmp/project");
const name = folder.getName();
// name: string | null

const parentPath = folder.getParentPath();
// parentPath: string | null

const result = await folder.getChildren();

if (E.isRight(result)) {
	const childrens = unwrap(result);
}

const result2 = await folder.walk();

if (E.isRight(result2)) {
	G.map(
		unwrap(result2),
		(element) => {
			type check = ExpectType<
				typeof element,
				SF.FolderInterface | SF.FileInterface | SF.UnknownInterface,
				"strict"
			>;
		},
	);
}

if (SF.isFolderInterface(folder)) {
	// folder: SF.FolderInterface
	await folder.getChildren();
}
