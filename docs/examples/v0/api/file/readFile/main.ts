import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const decoder = new TextDecoder();
const result = await SF.readFile("/tmp/file.bin");
// result: SF.FileSystemLeft<"read-file"> | Success<Uint8Array>

if (E.isRight(result)) {
	const fileBytes = unwrap(result);
	const fileContent = decoder.decode(fileBytes);
	// fileContent: string
}

