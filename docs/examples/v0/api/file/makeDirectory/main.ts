import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.makeDirectory("/tmp/project");
// result: E.Ok | SF.FileSystemLeft<"make-directory">

if (E.isRight(result)) {
	// directory create with success
}

await SF.makeDirectory("/tmp/project/sub", { recursive: true });
