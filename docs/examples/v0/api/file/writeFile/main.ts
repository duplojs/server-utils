import { SF } from "@server-utils/v0";
import { E } from "@duplojs/utils";

const encodedText = new TextEncoder().encode("I ❤️ DuploJS");
const result = await SF.writeFile("/tmp/file.bin", encodedText);
// result= SF.FileSystemLeft<"write-file"> | Ok

if (E.isRight(result)) {
	// encoded "I ❤️ DuploJS" write with success
}
