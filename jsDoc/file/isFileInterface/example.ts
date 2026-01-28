import { SF } from "@scripts";

const file = SF.createFileInterface("/tmp/example.txt");

if (SF.isFileInterface(file)) {
	// file: FileInterface
	file.getParentPath();
}
