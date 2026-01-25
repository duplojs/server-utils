import { SF } from "@scripts";

const data = new Uint8Array([1, 2, 3]);
const result = await SF.writeFile("/tmp/file.bin", data);
// result: EitherOk | EitherFail

await SF.writeFile("/tmp/backup.bin", data);
