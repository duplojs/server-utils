import { SDPE, type SF } from "@server-utils/v0";
import { E, type ExpectType, type DP } from "@duplojs/utils";

const schema = SDPE
	.coerce
	.file()
	.exist()
	.mimeType(/^image\/(?:png|jpeg)$/)
	.size({ max: 5_000_000 });

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
