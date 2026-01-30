import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.makeTemporaryDirectory("tmp-");
// result: E.Success<string> | SF.FileSystemLeft<"make-temporary-directory">

if (E.isRight(result)) {
	const tmpDir = unwrap(result);
	// tmpDir: string
}
