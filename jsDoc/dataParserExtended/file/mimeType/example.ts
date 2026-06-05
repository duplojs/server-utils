import { SDPE, SF } from "@scripts";

const imageParser = SDPE.file()
	.mimeType(/^image\//);
imageParser.parse(
	SF.createFileInterface("/path/picture.png"),
);

const documentParser = SDPE.file()
	.mimeType(["application/pdf", "text/plain"]);
documentParser.parse(
	SF.createFileInterface("/path/document.pdf"),
);

const existingJsonParser = SDPE.file()
	.mimeType("application/json")
	.exist();
await existingJsonParser.asyncParse(
	SF.createFileInterface("/path/config.json"),
);
