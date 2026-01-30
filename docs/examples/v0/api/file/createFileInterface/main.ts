import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const file = SF.createFileInterface("/tmp/example.json");
const name = file.getName();
// name: string | null

const parentPath = file.getParentPath();
// parentPath: string | null

const stat = await file.stat();
// stat: E.Success<SF.StatInfo> | SF.FileSystemLeft<"stat">

if (E.isRight(stat)) {
	const info = unwrap(stat);
	// info.isFile: boolean
}

if (SF.isFileInterface(file)) {
	// file: SF.FileInterface
	file.getParentPath();
}
