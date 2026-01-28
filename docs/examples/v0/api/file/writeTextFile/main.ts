import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = await SF.writeTextFile("/tmp/file.txt", "I ❤️ DuploJS");
// result= FileSystemLeft | Ok

if (E.isRight(result)) {
	// "I ❤️ DuploJS" write with success
}
