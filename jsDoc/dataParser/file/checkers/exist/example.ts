import { SDP, SF } from "@scripts";

const parser = SDP.file({
	checkers: [SDP.checkerFileExist()],
});
await parser.asyncParse(
	SF.createFileInterface("/path/document.pdf"),
);

const withOtherChecker = SDP.file({
	checkers: [
		SDP.checkerFileExist(),
		SDP.checkerFileMimeType(/^image\//),
	],
});
await withOtherChecker.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);

await SDP.file()
	.addChecker(SDP.checkerFileExist())
	.asyncParse(SF.createFileInterface("/path/archive.zip"));
