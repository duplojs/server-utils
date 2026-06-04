import { SDP, type SF } from "@server-utils/v0";
import { E, type DP, type ExpectType } from "@duplojs/utils";

const schema = SDP.coerce.file({
	checkers: [
		SDP.checkerFileExist(),
		SDP.checkerFileSize({ max: 2_000_000 }),
	],
});

// @error: Incorrect: parse cannot execute asynchronous checkers.
const syncResult = schema.parse("/path/file.json");

// @annotate: Correct: asyncParse awaits asynchronous checkers.
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
