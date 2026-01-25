import { SF } from "@scripts";

const result = await SF.readFile("/tmp/file.bin");
// result: EitherSuccess<Uint8Array> | EitherFail

const other = await SF.readFile("/tmp/backup.bin");
