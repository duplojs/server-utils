import { SDPE, SF } from "@scripts";

const maybeFile: SF.FileInterface | undefined = SF.createFileInterface("path/file.txt");

const byMimeType = SDPE.file()
	.mimeType(["image/png", "image/jpeg"]);
byMimeType.parse(maybeFile);
// Error<DataParserError> | Success<SF.FileInterface>

const withMinAndMax = SDPE.coerce.file()
	.minSize("10kb")
	.maxSize("2mb");
await withMinAndMax.asyncParse("/path/archive.zip");
// Promise<Error<DataParserError> | Success<SF.FileInterface>>

const mustExist = SDPE.coerce.file()
	.mustExist();
await mustExist.asyncParse("/path/document.pdf");
// Promise<Error<DataParserError> | Success<SF.FileInterface>>
