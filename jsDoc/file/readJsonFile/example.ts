import { SF } from "@scripts";

const config = await SF.readJsonFile("/tmp/config.json");
// config: E.Success<unknown> | SF.FileSystemLeft

const data = await SF.readJsonFile("/tmp/data.json");
