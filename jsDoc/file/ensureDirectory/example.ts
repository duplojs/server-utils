import { SF } from "@scripts";

const result = await SF.ensureDirectory("/tmp/project");
// result: E.Ok | SF.FileSystemLeft

await SF.ensureDirectory("/tmp/project/sub");
