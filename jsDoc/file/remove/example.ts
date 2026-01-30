import { SF } from "@scripts";

const result = await SF.remove("/tmp/file.txt");
// result: E.Ok | SF.FileSystemLeft<"remove">

await SF.remove("/tmp/project", { recursive: true });
