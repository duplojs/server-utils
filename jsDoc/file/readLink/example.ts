import { SF } from "@scripts";

const target = await SF.readLink("/tmp/link");
// target: EitherSuccess<string> | EitherFail

const other = await SF.readLink("/tmp/other-link");
