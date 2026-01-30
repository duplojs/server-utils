import { SF } from "@scripts";

const info = await SF.linkStat("/tmp/link");
// info: E.Success<StatInfo> | SF.FileSystemLeft<"link-stat">

const other = await SF.linkStat("/tmp/other-link");
