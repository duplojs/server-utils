import { D } from "@duplojs/utils";
import { SF } from "@duplojs/server-utils";

const now = D.now();
const result = await SF.setTime("/tmp/file.txt", {
	accessTime: now,
	modifiedTime: now,
});
// result: E.Ok | SF.FileSystemLeft<"set-time">

await SF.setTime("/tmp/report.txt", {
	accessTime: now,
	modifiedTime: now,
});
