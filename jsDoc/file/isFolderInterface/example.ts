import { SF } from "@scripts";

const folder = SF.createFolderInterface("/tmp/project");

if (SF.isFolderInterface(folder)) {
	// folder: FolderInterface
	await folder.getChildren();
}
