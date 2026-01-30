import { SF } from "@duplojs/server-utils";

const result = await SF.symlink("/tmp/target", "/tmp/link");
// result: E.Ok | SF.FileSystemLeft<"symlink">

await SF.symlink("/tmp/target", "/tmp/link-file", { type: "file" });
