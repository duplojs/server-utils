import { SDP, SF } from "@scripts";

const fileInterface = SF.createFileInterface("path/file.txt");

const basicParser = SDP.file();
basicParser.parse(fileInterface);
// Error<DataParserError> | Success<SF.FileInterface>

const coerceParser = SDP.coerce.file();
coerceParser.parse("/path/readme.md");
// Error<DataParserError> | Success<SF.FileInterface>

const constrainedParser = SDP.file({
	checkers: [
		SDP.checkerFileMimeType(/^image\//),
		SDP.checkerFileExist(),
		SDP.checkerFileSize({ max: 2_000_000 }),
	],
});
await constrainedParser.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);
// Promise<Error<DataParserError> | Success<SF.FileInterface>>
