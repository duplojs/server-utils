import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.remove("/tmp/file.txt");
// result: E.Ok | SF.FileSystemLeft<"remove">

if (E.isRight(result)) {
	// element remove with success
}

await SF.remove("/tmp/project", { recursive: true });
