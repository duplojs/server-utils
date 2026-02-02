import { type ExpectType, type DP, E, pipe, stringToBytes, unwrap } from "@duplojs/utils";
import { DServerDataParser, DServerFile } from "@scripts";
import * as DServerFileSource from "@scripts/file";
import type { FileInterface } from "@scripts/file";

describe("dataParser.coerce.file", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("coerces a string path to a file interface", async() => {
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 5,
		} as any));
		const createFileInterfaceSpy = vi
			.spyOn(DServerFileSource, "createFileInterface")
			.mockReturnValue(file);
		const schema = DServerDataParser.coerce.file();

		const result = await schema.asyncParse("/tmp/demo.txt");

		expect(createFileInterfaceSpy).toHaveBeenCalledWith("/tmp/demo.txt");
		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("fails for non string values that are not file interfaces", async() => {
		const schema = DServerDataParser.coerce.file();

		const result = await schema.asyncParse({ path: "/tmp/demo.txt" });

		expect(E.isLeft(result)).toBe(true);
	});

	it("works in pipe", async() => {
		const schema = pipe(
			{ mimeType: /^application\/json$/ },
			DServerDataParser.coerce.file,
		);
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
