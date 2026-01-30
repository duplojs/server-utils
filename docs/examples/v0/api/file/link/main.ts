import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.link("/tmp/original", "/tmp/hardlink");
// result: E.Ok | SF.FileSystemLeft<"link">

if (E.isRight(result)) {
	// link is create with success
}
