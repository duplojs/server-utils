import { SF } from "@scripts";

const resolved = await SF.realPath("/tmp/./file.txt");
// resolved: EitherSuccess<string> | EitherFail

const other = await SF.realPath("/tmp/../tmp/file.txt");
