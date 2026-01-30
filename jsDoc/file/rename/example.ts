import { SF } from "@scripts";

const result = await SF.rename("/tmp/file.txt", "renamed.txt");
// result: E.Success<string> | SF.FileSystemLeft<"rename">

await SF.rename("/tmp/notes.txt", "notes-old.txt");

const moreResult = await SF.rename("/tmp/archive.log", "archive-old.log");
// moreResult: E.Success<string> | SF.FileSystemLeft<"rename">
