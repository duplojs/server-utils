import { SF } from "@scripts";

const entries = await SF.readDirectory("/tmp");
// entries: EitherSuccess<string[]> | EitherFail

const recursive = await SF.readDirectory("/tmp", { recursive: true });
