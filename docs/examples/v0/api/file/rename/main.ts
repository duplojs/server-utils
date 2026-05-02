import { SF } from "@server-utils/v0";

const result = await SF.rename("/tmp/file.txt", "renamed.txt");
// result: E.Success<string> | SF.FileSystemLeft<"rename">

await SF.rename("/tmp/notes.txt", "notes-old.txt");
