import { asyncPipe } from "@duplojs/utils";
import { SF } from "@scripts";

const data = new Uint8Array([4, 5]);
const result = await SF.appendFile("/tmp/log.bin", data);
// result: EitherOk | EitherFail

const more = new Uint8Array([6]);
await SF.appendFile("/tmp/log.bin", more);

await asyncPipe(
	new Uint8Array([7, 8]),
	(data) => SF.appendFile("/tmp/log.bin", data),
);
