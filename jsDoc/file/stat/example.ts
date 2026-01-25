import { SF } from "@scripts";

const info = await SF.stat("/tmp/file.txt");
// info: EitherSuccess<StatInfo> | EitherFail

const dirInfo = await SF.stat("/tmp");
