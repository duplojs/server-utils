import { SF } from "@scripts";

const result = await SF.link("/tmp/original", "/tmp/hardlink");
// result: E.Ok | SF.FileSystemLeft

await SF.link("/tmp/data.bin", "/tmp/data-copy.bin");
