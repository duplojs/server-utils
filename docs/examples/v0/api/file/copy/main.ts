import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.copy("/tmp/src", "/tmp/dest");
// result: E.Ok | SF.FileSystemLeft<"copy">

if (E.isRight(result)) {
	// element copy with success
}
