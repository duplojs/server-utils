import { SDPE, SF } from "@scripts";

const maximumSizeParser = SDPE.file()
	.size({ max: "2mb" });
await maximumSizeParser.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);

const rangedSizeParser = SDPE.file()
	.size({
		min: "10kb",
		max: "2mb",
	});
await rangedSizeParser.asyncParse(
	SF.createFileInterface("/path/archive.zip"),
);

const coerceParser = SDPE.coerce.file()
	.size({ min: 1 });
await coerceParser.asyncParse("/path/document.pdf");
