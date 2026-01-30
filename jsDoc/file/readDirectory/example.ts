import { SF } from "@scripts";

const entries = await SF.readDirectory("/tmp");
// entries: E.Success<string[]> | SF.FileSystemLeft<"read-directory">

const recursive = await SF.readDirectory("/tmp", { recursive: true });
