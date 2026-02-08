import { SDP, type SF } from "@duplojs/server-utils";
import { E, type DP, type ExpectType } from "@duplojs/utils";

const schema = SDP.coerce.file({
	checkExist: true,
	maxSize: "2mb",
});

// parse returns an Either immediately and cannot execute async I/O checks.
const syncResult = schema.parse("/path/file.json");

if (E.isLeft(syncResult)) {
	type check = ExpectType<
		typeof syncResult,
		E.Error<DP.DataParserError>,
		"strict"
	>;
}

// asyncParse runs full checks (existence and size) and returns Promise<Either>.
const asyncResult = await schema.asyncParse("/path/file.json");

if (E.isRight(asyncResult)) {
	type check = ExpectType<
		typeof asyncResult,
		E.Success<SF.FileInterface>,
		"strict"
	>;
} else {
	type check = ExpectType<
		typeof asyncResult,
		E.Error<DP.DataParserError>,
		"strict"
	>;
}
