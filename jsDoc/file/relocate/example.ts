import { E, unwrap } from "@duplojs/utils";
import { SF } from "@scripts";

const result = await SF.relocate("/tmp/report.txt", "/tmp/archive");
// result: E.Success<string> | SF.FileSystemLeft<"relocate">

if (E.isRight(result)) {
	const newPath = unwrap(result);
	// newPath: string
}

await SF.relocate("/tmp/photo.png", "/tmp/images");
await SF.relocate("/tmp/logs/app.log", "/tmp/logs/old");
