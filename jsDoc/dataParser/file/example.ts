import { SDP, SF } from "@scripts";

const maybeFile: SF.FileInterface | undefined = SF.createFileInterface("path/file.txt");

const basic = SDP.file({
	mimeType: "application/json",
});
basic.parse(maybeFile);
// Error<DataParserError> | Success<SF.FileInterface>

const withCoerce = SDP.coerce.file();
withCoerce.parse("/path/readme.md");
// Error<DataParserError> | Success<SF.FileInterface>

const withAsyncChecks = SDP.coerce.file({
	checkExist: true,
	maxSize: "2mb",
});
await withAsyncChecks.asyncParse("/path/picture.png");
// Promise<Error<DataParserError> | Success<SF.FileInterface>>
