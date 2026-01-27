import { SF } from "@scripts";

const tmpDir = await SF.makeTemporaryDirectory("tmp-");
// tmpDir: E.Success<string> | SF.FileSystemLeft

const cacheDir = await SF.makeTemporaryDirectory("cache-");
