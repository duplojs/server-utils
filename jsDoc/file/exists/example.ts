import { SF } from "@scripts";

const result = await SF.exists("/tmp/file.txt");
// result: E.Ok | SF.FileSystemLeft

const missing = await SF.exists("/tmp/missing.txt");
