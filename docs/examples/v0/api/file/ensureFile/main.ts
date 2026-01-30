import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.ensureFile("/tmp/empty.txt");
// result: E.Ok | SF.FileSystemLeft<"ensure-file">

if (E.isRight(result)) {
	// if the file already exists, nothing happens (create if not exist)
}
