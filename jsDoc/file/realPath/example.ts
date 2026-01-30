import { SF } from "@scripts";

const resolved = await SF.realPath("/tmp/./file.txt");
// resolved: E.Success<string> | SF.FileSystemLeft<"real-path">

const other = await SF.realPath("/tmp/../tmp/file.txt");
