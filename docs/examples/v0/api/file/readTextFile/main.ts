import { SF } from "@server-utils/v0";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.readTextFile("/tmp/file.txt");
// result: SF.FileSystemLeft<"read-text-file"> | E.Success<string>

if (E.isRight(result)) {
	const fileContent = unwrap(result);
	// fileContent: string
}
