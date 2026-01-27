import { SF } from "@scripts";

const result = await SF.writeTextFile("/tmp/log.txt", "hello\n");
// result: E.Ok | SF.FileSystemLeft

await SF.writeTextFile("/tmp/log.txt", "world\n");
