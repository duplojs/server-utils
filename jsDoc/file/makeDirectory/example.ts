import { SF } from "@scripts";

const result = await SF.makeDirectory("/tmp/project");
// result: E.Ok | SF.FileSystemLeft<"make-directory">

await SF.makeDirectory("/tmp/project/sub", { recursive: true });
