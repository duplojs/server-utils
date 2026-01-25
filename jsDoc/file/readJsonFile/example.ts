import { SF } from "@scripts";

const config = await SF.readJsonFile("/tmp/config.json");
// config: EitherSuccess<unknown> | EitherFail

const data = await SF.readJsonFile("/tmp/data.json");
