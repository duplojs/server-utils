import { SF } from "@scripts";

const result = await SF.ensureFile("/tmp/empty.txt");
// result: E.Ok | SF.FileSystemLeft<"ensure-file">

await SF.ensureFile("/tmp/cache.json");
