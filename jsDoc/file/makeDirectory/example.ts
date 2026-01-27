import { SF } from "@scripts";

const result = await SF.makeDirectory("/tmp/project");
// result: E.Ok | SF.FileSystemLeft

await SF.makeDirectory("/tmp/project/sub", { recursive: true });
