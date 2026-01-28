import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const file = SF.createFileInterface("/tmp/example.json");
const parentPath = file.getParentPath();
// parentPath: string

const stat = await file.stat();
// stat: E.Success<SF.StatInfo> | SF.FileSystemLeft

if (E.isRight(stat)) {
	const info = unwrap(stat);
	// info.isFile: boolean
}

if (SF.isFileInterface(file)) {
	// file: SF.FileInterface
	file.getParentPath();
}
