import { SF } from "@scripts";

const target = await SF.readLink("/tmp/link");
// target: E.Success<string> | SF.FileSystemLeft<"read-link">

const other = await SF.readLink("/tmp/other-link");
