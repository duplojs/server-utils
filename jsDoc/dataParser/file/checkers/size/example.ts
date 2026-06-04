import { SDP, SF } from "@scripts";

const maximumSizeParser = SDP.file({
	checkers: [SDP.checkerFileSize({ max: 2_000_000 })],
});
await maximumSizeParser.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);

const rangedSizeParser = SDP.file({
	checkers: [
		SDP.checkerFileSize({
			min: 10_000,
			max: 2_000_000,
		}),
	],
});
await rangedSizeParser.asyncParse(
	SF.createFileInterface("/path/archive.zip"),
);

await SDP.file()
	.addChecker(SDP.checkerFileSize({ min: 1 }))
	.asyncParse(SF.createFileInterface("/path/document.pdf"));
