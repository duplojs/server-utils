import { SF } from "@scripts";

const result = await SF.writeJsonFile("/tmp/config.json", { enabled: true });
// result: EitherOk | EitherFail

await SF.writeJsonFile("/tmp/config.json", { enabled: true }, { space: 2 });
