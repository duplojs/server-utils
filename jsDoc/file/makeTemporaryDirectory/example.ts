import { SF } from "@scripts";

const tmpDir = await SF.makeTemporaryDirectory("tmp-");
// tmpDir: EitherSuccess<string> | EitherFail

const cacheDir = await SF.makeTemporaryDirectory("cache-");
