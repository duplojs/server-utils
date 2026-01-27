import { SF } from "@scripts";

const result = await SF.ensureFile("/tmp/empty.txt");
// result: E.Ok | SF.FileSystemLeft

await SF.ensureFile("/tmp/cache.json");
