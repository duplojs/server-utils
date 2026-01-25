import { SF } from "@scripts";

const result = await SF.symlink("/tmp/target", "/tmp/link");
// result: EitherOk | EitherFail

await SF.symlink("/tmp/target", "/tmp/link-file", { type: "file" });
