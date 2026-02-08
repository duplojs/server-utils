import { SDPE, type SF } from "@duplojs/server-utils";
import { E, type ExpectType, type DP } from "@duplojs/utils";

const schema = SDPE
	.coerce
	.file()
	.mustExist()
	.mimeType(["image/png", "image/jpeg"])
	.maxSize("5mb");

const result = await schema.asyncParse("/path/image.png");

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
