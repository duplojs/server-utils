import { SDPE, SF } from "@scripts";

const parser = SDPE.file().exist();
await parser.asyncParse(
	SF.createFileInterface("/path/document.pdf"),
);

const coerceParser = SDPE.coerce.file().exist();
await coerceParser.asyncParse("/path/picture.png");

const existingImageParser = SDPE.file()
	.mimeType(/^image\//)
	.exist();
await existingImageParser.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);
