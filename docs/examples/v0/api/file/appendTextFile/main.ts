import { SF } from "@server-utils/v0";
import { E } from "@duplojs/utils";

const result = await SF.appendTextFile("/tmp/file.txt", "I ❤️ DuploJS \n");
// result: E.Ok | SF.FileSystemLeft<"append-text-file">

if (E.isRight(result)) {
	// "I ❤️ DuploJS" append with success
}
