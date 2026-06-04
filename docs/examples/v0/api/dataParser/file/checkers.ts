import { SDP, type SF } from "@server-utils/v0";
import { E, type ExpectType, type DP } from "@duplojs/utils";

const schema = SDP
	.coerce
	.file()
	.addChecker(
		SDP.checkerFileExist(),
		SDP.checkerFileSize(
			{
				min: 1,
				max: 5_000_000,
			},
			{ errorMessage: "file.invalid-size" },
		),
		SDP.checkerFileMimeType(/^image\/(?:png|jpeg)$/),
	);

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
