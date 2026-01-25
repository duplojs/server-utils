import { SF } from "@scripts";

const result = await SF.makeDirectory("/tmp/project");
// result: EitherOk | EitherFail

await SF.makeDirectory("/tmp/project/sub", { recursive: true });
