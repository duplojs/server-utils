import { SDPE, SF } from "@scripts";

const fileInterface = SF.createFileInterface("path/file.txt");

const mimeTypeParser = SDPE.file()
	.mimeType(/^image\/(?:png|jpeg)$/);
mimeTypeParser.parse(fileInterface);
// Error<DataParserError> | Success<SF.FileInterface>

const sizeParser = SDPE.file()
	.size({
		min: 10_000,
		max: 2_000_000,
	});
await sizeParser.asyncParse(fileInterface);
// Promise<Error<DataParserError> | Success<SF.FileInterface>>

const existingImageParser = SDPE.coerce.file()
	.mimeType(/^image\//)
	.exist();
await existingImageParser.asyncParse("/path/picture.png");
// Promise<Error<DataParserError> | Success<SF.FileInterface>>
