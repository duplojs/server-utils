import { SF } from "@scripts";

const result = await SF.walkDirectory("/tmp/project");
// result: EitherSuccess<Generator<...>> | EitherFail

const other = await SF.walkDirectory("/tmp/other");
