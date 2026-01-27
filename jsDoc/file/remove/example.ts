import { SF } from "@scripts";

const result = await SF.remove("/tmp/file.txt");
// result: E.Ok | SF.FileSystemLeft

await SF.remove("/tmp/project", { recursive: true });
