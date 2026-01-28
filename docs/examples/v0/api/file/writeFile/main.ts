import { SF } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const encodedText = new TextEncoder().encode("I ❤️ DuploJS");
const result = await SF.writeFile("/tmp/file.bin", encodedText);
// result= FileSystemLeft | Ok

if (E.isRight(result)) {
	// encoded "I ❤️ DuploJS" write with success
}
