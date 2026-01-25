import { SF } from "@scripts";

const result = await SF.exists("/tmp/file.txt");
// result: EitherOk | EitherFail

const missing = await SF.exists("/tmp/missing.txt");
