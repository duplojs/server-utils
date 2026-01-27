import { SF } from "@scripts";

const result = await SF.readTextFile("/tmp/notes.txt");
// result: E.Success<string> | SF.FileSystemLeft

const other = await SF.readTextFile("/tmp/readme.txt");
