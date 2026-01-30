import { SF } from "@scripts";

const result = await SF.readFile("/tmp/file.bin");
// result: E.Success<Uint8Array> | SF.FileSystemLeft<"read-file">

const other = await SF.readFile("/tmp/backup.bin");
