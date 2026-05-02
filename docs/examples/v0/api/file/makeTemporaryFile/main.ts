import { SF } from "@server-utils/v0";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.makeTemporaryFile("tmp-", ".log");
// result: E.Success<string> | SF.FileSystemLeft<"make-temporary-file">

if (E.isRight(result)) {
	const tmpFile = unwrap(result);
	// tmpFile: string
}

const report = await SF.makeTemporaryFile("report-");
