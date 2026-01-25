import { SF } from "@scripts";

const cleared = await SF.truncate("/tmp/file.bin", 0);
// cleared: EitherOk | EitherFail

await SF.truncate("/tmp/file.bin", 128);
