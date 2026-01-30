import { SF } from "@scripts";

const result = await SF.writeTextFile("/tmp/log.txt", "hello\n");
// result: E.Ok | SF.FileSystemLeft<"write-text-file">

await SF.writeTextFile("/tmp/log.txt", "world\n");
