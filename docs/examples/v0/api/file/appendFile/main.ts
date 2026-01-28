import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const payload = new TextEncoder().encode("I ❤️ DuploJS \n");
const result = await SF.appendFile("/tmp/file.bin", payload);
// result: E.Ok | SF.FileSystemLeft

if (E.isRight(result)) {
	// encoded "I ❤️ DuploJS" append with success
}
