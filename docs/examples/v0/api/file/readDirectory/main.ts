import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const entries = await SF.readDirectory("/tmp");
// entries: E.Success<string[]> | SF.FileSystemLeft

if (E.isRight(entries)) {
	const list = unwrap(entries);
	// list: string[]
}

const recursive = await SF.readDirectory("/tmp", { recursive: true });
// recursive: E.Success<string[]> | SF.FileSystemLeft
