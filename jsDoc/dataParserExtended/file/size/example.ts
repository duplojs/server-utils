import { SDPE, SF } from "@scripts";

const maximumSizeParser = SDPE.file()
	.size({ max: 2_000_000 });
await maximumSizeParser.asyncParse(
	SF.createFileInterface("/path/picture.png"),
);

const rangedSizeParser = SDPE.file()
	.size({
		min: 10_000,
		max: 2_000_000,
	});
await rangedSizeParser.asyncParse(
	SF.createFileInterface("/path/archive.zip"),
);

const coerceParser = SDPE.coerce.file()
	.size({ min: 1 });
await coerceParser.asyncParse("/path/document.pdf");
