import { SF } from "@scripts";

const result = await SF.copy("/tmp/src", "/tmp/dest");
// result: EitherOk | EitherFail

await SF.copy("/tmp/assets", "/tmp/assets-backup");
