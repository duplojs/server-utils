import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const info = await SF.linkStat("/tmp/link");
// info: E.Success<SF.StatInfo> | SF.FileSystemLeft<"link-stat">

if (E.isRight(info)) {
	const metadata = unwrap(info);
	// metadata.isSymlink: boolean
}
