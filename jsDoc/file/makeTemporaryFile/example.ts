import { SF } from "@scripts";

const tmpFile = await SF.makeTemporaryFile("tmp-", ".log");
// tmpFile: EitherSuccess<string> | EitherFail

const report = await SF.makeTemporaryFile("report-");
