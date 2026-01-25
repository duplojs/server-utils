import { SF } from "@scripts";

const result = await SF.readTextFile("/tmp/notes.txt");
// result: EitherSuccess<string> | EitherFail

const other = await SF.readTextFile("/tmp/readme.txt");
