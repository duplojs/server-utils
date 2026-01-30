import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.relocate("/tmp/example.txt", "/tmp/archive");
// result: E.Success<string> | SF.FileSystemLeft<"relocate">

if (E.isRight(result)) {
	const newPath = unwrap(result);
	// newPath: string
}
