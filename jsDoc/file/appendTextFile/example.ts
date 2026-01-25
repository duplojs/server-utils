import { asyncPipe } from "@duplojs/utils";
import { SF } from "@scripts";

const result = await SF.appendTextFile("/tmp/log.txt", "line\n");
// result: EitherOk | EitherFail

await SF.appendTextFile("/tmp/log.txt", "second line\n");

await asyncPipe(
	"third line\n",
	(text) => SF.appendTextFile("/tmp/log.txt", text),
);
