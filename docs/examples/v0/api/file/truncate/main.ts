import { SF } from "@duplojs/server-utils";

const cleared = await SF.truncate("/tmp/file.bin", 0);
// cleared: E.Ok | SF.FileSystemLeft<"truncate">

await SF.truncate("/tmp/file.bin", 128);
