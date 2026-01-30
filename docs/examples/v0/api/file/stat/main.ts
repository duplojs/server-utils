import { SF } from "@duplojs/server-utils";
import { E, type ExpectType, unwrap } from "@duplojs/utils";

const result = await SF.stat("/tmp/file.txt");
// result: SF.FileSystemLeft<"stat"> | Success<SF.StatInfo>

if (E.isRight(result)) {
	const fileInfo = unwrap(result);

	type check = ExpectType<
		typeof fileInfo,
		SF.StatInfo,
		"strict"
	>;
}
