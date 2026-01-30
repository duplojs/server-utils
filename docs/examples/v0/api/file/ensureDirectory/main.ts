import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.ensureDirectory("/tmp/project");
// result: E.Ok | SF.FileSystemLeft<"ensure-directory">

if (E.isRight(result)) {
	// directory create with success
}
