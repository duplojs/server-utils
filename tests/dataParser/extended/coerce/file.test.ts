import { E, pipe, unwrap } from "@duplojs/utils";
import { DServerDataParser, DServerFile } from "@scripts";
import * as DServerFileSource from "@scripts/file";

describe("dataParser.extended.coerce.file", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("coerces string path and parses successfully", async() => {
		const schema = DServerDataParser.extended.coerce.file();
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 2,
		} as any));
		vi.spyOn(DServerFileSource, "createFileInterface").mockReturnValue(file);

		const result = await schema.asyncParse("/tmp/demo.txt");

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("works in pipe and keeps extended helpers", async() => {
		const schema = pipe(
			{ mimeType: /^application\/json$/ },
			DServerDataParser.extended.coerce.file,
		).maxSize(10);
		const file = DServerFile.createFileInterface(
			"/tmp/demo.json",
			{ mimeType: "application/json" },
		);
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 5,
		} as any));
		vi.spyOn(DServerFileSource, "createFileInterface").mockReturnValue(file);

		const result = await schema.asyncParse("/tmp/demo.json");

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});
});
