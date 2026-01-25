import { SF } from "@scripts";

const result = await SF.writeTextFile("/tmp/log.txt", "hello\n");
// result: EitherOk | EitherFail

await SF.writeTextFile("/tmp/log.txt", "world\n");
