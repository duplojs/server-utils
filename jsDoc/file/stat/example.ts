import { SF } from "@scripts";

const info = await SF.stat("/tmp/file.txt");
// info: E.Success<StatInfo> | SF.FileSystemLeft

const dirInfo = await SF.stat("/tmp");
