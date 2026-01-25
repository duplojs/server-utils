import { SF } from "@scripts";

const result = await SF.ensureFile("/tmp/empty.txt");
// result: EitherOk | EitherFail

await SF.ensureFile("/tmp/cache.json");
