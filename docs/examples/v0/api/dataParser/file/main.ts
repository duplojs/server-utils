import { SDP, type SF } from "@duplojs/server-utils";
import { E, type ExpectType, type DP } from "@duplojs/utils";

const schema = SDP.coerce.file({
	mimeType: "application/json",
});

const result = await schema.asyncParse("/path/file.json");

if (E.isRight(result)) {
	type check = ExpectType<
		typeof result,
		E.Success<SF.FileInterface>,
		"strict"
	>;
} else {
	type check = ExpectType<
		typeof result,
		E.Error<DP.DataParserError>,
		"strict"
	>;
}
