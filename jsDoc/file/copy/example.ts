import { SF } from "@scripts";

const result = await SF.copy("/tmp/src", "/tmp/dest");
// result: E.Ok | SF.FileSystemLeft

await SF.copy("/tmp/assets", "/tmp/assets-backup");
