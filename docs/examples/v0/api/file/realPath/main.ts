import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const resolved = await SF.realPath("/tmp/./file.txt");
// resolved: E.Success<string> | SF.FileSystemLeft

if (E.isRight(resolved)) {
	const path = unwrap(resolved);
	// path: string
}
