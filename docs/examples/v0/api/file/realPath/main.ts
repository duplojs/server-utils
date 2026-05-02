import { SF } from "@server-utils/v0";
import { E, unwrap } from "@duplojs/utils";

const resolved = await SF.realPath("/tmp/./file.txt");
// resolved: E.Success<string> | SF.FileSystemLeft<"real-path">

if (E.isRight(resolved)) {
	const path = unwrap(resolved);
	// path: string
}
