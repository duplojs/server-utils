import { SF } from "@scripts";

const tmpFile = await SF.makeTemporaryFile("tmp-", ".log");
// tmpFile: E.Success<string> | SF.FileSystemLeft

const report = await SF.makeTemporaryFile("report-");
