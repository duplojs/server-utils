import { SF } from "@scripts";

const result = await SF.remove("/tmp/file.txt");
// result: EitherOk | EitherFail

await SF.remove("/tmp/project", { recursive: true });
