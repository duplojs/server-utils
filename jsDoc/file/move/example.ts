import { SF } from "@scripts";

const result = await SF.move("/tmp/src", "/tmp/dest");
// result: E.Ok | SF.FileSystemLeft

await SF.move("/tmp/file.txt", "/tmp/archive/file.txt");
