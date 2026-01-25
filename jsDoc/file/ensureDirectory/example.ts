import { SF } from "@scripts";

const result = await SF.ensureDirectory("/tmp/project");
// result: EitherOk | EitherFail

await SF.ensureDirectory("/tmp/project/sub");
