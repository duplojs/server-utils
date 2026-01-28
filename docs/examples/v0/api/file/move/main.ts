import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.move("/tmp/src", "/tmp/dest");
// result: E.Ok | SF.FileSystemLeft

if (E.isRight(result)) {
	// element move with success
}

await SF.move("/tmp/file.txt", "/tmp/archive/file.txt");
