import { SF } from "@scripts";

const result = await SF.symlink("/tmp/target", "/tmp/link");
// result: E.Ok | SF.FileSystemLeft

await SF.symlink("/tmp/target", "/tmp/link-file", { type: "file" });
