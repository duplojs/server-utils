import { SF } from "@scripts";

const result = await SF.rename("/tmp/file.txt", "renamed.txt");
// result: E.Ok | SF.FileSystemLeft

await SF.rename("/tmp/notes.txt", "notes-old.txt");
