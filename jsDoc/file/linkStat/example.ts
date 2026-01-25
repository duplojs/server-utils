import { SF } from "@scripts";

const info = await SF.linkStat("/tmp/link");
// info: EitherSuccess<StatInfo> | EitherFail

const other = await SF.linkStat("/tmp/other-link");
