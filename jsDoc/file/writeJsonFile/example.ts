import { SF } from "@scripts";

const result = await SF.writeJsonFile("/tmp/config.json", { enabled: true });
// result: E.Ok | SF.FileSystemLeft<"write-json-file">

await SF.writeJsonFile("/tmp/config.json", { enabled: true }, { space: 2 });
