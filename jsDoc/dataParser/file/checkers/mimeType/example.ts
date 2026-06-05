import { SDP, SF } from "@scripts";

const imageParser = SDP.file({
	checkers: [SDP.checkerFileMimeType(/^image\//)],
});
imageParser.parse(
	SF.createFileInterface("/path/picture.png"),
);

const documentParser = SDP.file({
	checkers: [SDP.checkerFileMimeType(["application/pdf", "text/plain"])],
});
documentParser.parse(
	SF.createFileInterface("/path/document.pdf"),
);

SDP.file()
	.addChecker(SDP.checkerFileMimeType("application/json"))
	.parse(SF.createFileInterface("/path/config.json"));
