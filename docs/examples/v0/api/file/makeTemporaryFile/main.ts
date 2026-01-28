import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.makeTemporaryFile("tmp-", ".log");
// result: E.Success<string> | SF.FileSystemLeft

if (E.isRight(result)) {
	const tmpFile = unwrap(result);
	// tmpFile: string
}

const report = await SF.makeTemporaryFile("report-");
