import { type ExpectType, type DP, E, pipe, stringToBytes, unwrap } from "@duplojs/utils";
import { DServerDataParser, DServerFile } from "@scripts";
import type { FileInterface } from "@scripts/file";

describe("dataParser.extended.file", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("builds extended file parser", async() => {
		const schema = DServerDataParser.extended.file();
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 2,
		} as any));

		type _CheckOut = ExpectType<
			DP.Output<typeof schema>,
			FileInterface,
			"strict"
		>;

		expect(schema.isAsynchronous()).toBe(true);
		const result = await schema.asyncParse(file);
		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("mimeType helper overrides mimeType and keeps base definition", () => {
		const schema = DServerDataParser.extended.file(
			{
				minSize: "1kb",
				maxSize: "3kb",
			},
			{
				coerce: true,
				errorMessage: "bad-file",
			},
		);
		const next = schema.mimeType("text/plain");

		expect(next.definition.coerce).toBe(true);
		expect(next.definition.errorMessage).toBe("bad-file");
		expect(next.definition.minSize).toBe(stringToBytes("1kb"));
		expect(next.definition.maxSize).toBe(stringToBytes("3kb"));
		expect(next.definition.mimeType?.test("text/plain")).toBe(true);
		expect(next.definition.mimeType?.test("application/json")).toBe(false);
	});

	it("minSize helper overrides minSize and keeps previous constraints", () => {
		const mimeType = /^application\/json$/;
		const schema = DServerDataParser.extended.file({
			mimeType,
			maxSize: "5kb",
		});
		const next = schema.minSize("2kb");

		expect(next.definition.mimeType).toBe(mimeType);
		expect(next.definition.minSize).toBe(stringToBytes("2kb"));
		expect(next.definition.maxSize).toBe(stringToBytes("5kb"));
	});

	it("maxSize helper overrides maxSize and keeps previous constraints", () => {
		const mimeType = /^text\/plain$/;
		const schema = DServerDataParser.extended.file({
			mimeType,
			minSize: "1kb",
		});
		const next = schema.maxSize("4kb");

		expect(next.definition.mimeType).toBe(mimeType);
		expect(next.definition.minSize).toBe(stringToBytes("1kb"));
		expect(next.definition.maxSize).toBe(stringToBytes("4kb"));
	});

	it("works in pipe with chained helpers", async() => {
		const schema = pipe(
			{
				mimeType: "application/json",
				minSize: 1,
			},
			DServerDataParser.extended.file,
		).maxSize(20);
		const file = DServerFile.createFileInterface(
			"/tmp/demo.json",
			{ mimeType: "application/json" },
		);
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 10,
		} as any));

		const result = await schema.asyncParse(file);

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});
});
