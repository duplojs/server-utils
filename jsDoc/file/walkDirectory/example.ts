import { SF } from "@scripts";

const result = await SF.walkDirectory("/tmp/project");
// result: E.Success<Generator<...>> | SF.FileSystemLeft

const other = await SF.walkDirectory("/tmp/other");
