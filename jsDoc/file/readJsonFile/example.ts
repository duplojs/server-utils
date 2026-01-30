import { SF } from "@scripts";

const config = await SF.readJsonFile("/tmp/config.json");
// config: E.Success<unknown> | SF.FileSystemLeft<"read-json-file">

const data = await SF.readJsonFile("/tmp/data.json");
