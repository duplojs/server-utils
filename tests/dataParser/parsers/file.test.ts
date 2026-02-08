import { type ExpectType, type DP, E, pipe, stringToBytes, unwrap } from "@duplojs/utils";
import { DServerDataParser, DServerFile } from "@scripts";
import * as DServerFileSource from "@scripts/file";
import type { FileInterface } from "@scripts/file";

describe("dataParser.file", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("builds parser with escaped mime type and converted sizes", () => {
		const schema = DServerDataParser.file({
			mimeType: "image/png",
			minSize: "1kb",
			maxSize: "2kb",
		});

		type _CheckOut = ExpectType<
			DP.Output<typeof schema>,
			FileInterface,
			"strict"
		>;

		expect(schema.definition.mimeType?.test("image/png")).toBe(true);
		expect(schema.definition.mimeType?.test("imageXpng")).toBe(false);
		expect(schema.definition.minSize).toBe(stringToBytes("1kb"));
		expect(schema.definition.maxSize).toBe(stringToBytes("2kb"));
	});

	it("builds parser with array mime types", () => {
		const schema = DServerDataParser.file({
			mimeType: ["image/png", "application/pdf"],
		});

		expect(schema.definition.mimeType?.test("image/png")).toBe(true);
		expect(schema.definition.mimeType?.test("application/pdf")).toBe(true);
		expect(schema.definition.mimeType?.test("text/plain")).toBe(false);
	});

	it("keeps regexp mime type as-is", () => {
		const mimeType = /^text\/.+$/;
		const schema = DServerDataParser.file({ mimeType });

		expect(schema.definition.mimeType).toBe(mimeType);
	});

	it("fails when input is not a file interface and coercion is disabled", () => {
		const schema = DServerDataParser.file();

		const result = schema.parse({ path: "/tmp/demo.txt" });

		expect(E.isLeft(result)).toBe(true);
	});

	it("returns sync promise issue when async-only checks are enabled", () => {
		const schema = DServerDataParser.file({
			checkExist: true,
		});
		const createFileInterfaceSpy = vi.spyOn(DServerFileSource, "createFileInterface");

		const result = schema.parse("/tmp/demo.txt");

		expect(E.isLeft(result)).toBe(true);
		expect(createFileInterfaceSpy).not.toHaveBeenCalled();
	});

	it("coerces string input in sync parse when no async-only checks are enabled", () => {
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(DServerFileSource, "createFileInterface").mockReturnValue(file);
		const schema = DServerDataParser.file(undefined, {
			coerce: true,
		});

		const result = schema.parse("/tmp/demo.txt");

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("coerces string input to file interface when coercion is enabled", async() => {
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 10,
		} as any));
		vi.spyOn(DServerFileSource, "createFileInterface").mockReturnValue(file);
		const schema = DServerDataParser.file(undefined, {
			coerce: true,
			checkExist: true,
		});

		const result = await schema.asyncParse("/tmp/demo.txt");

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("falls back to empty mime type when metadata and extension are missing", () => {
		const schema = DServerDataParser.file({ mimeType: /^text\/plain$/ });
		const file = DServerFile.createFileInterface("/tmp/no-extension");

		const result = schema.parse(file);

		expect(E.isLeft(result)).toBe(true);
	});

	it("fails in async parse when mime type does not match", async() => {
		const schema = DServerDataParser.file({ mimeType: /^text\/plain$/ });
		const file = DServerFile.createFileInterface("/tmp/demo.json");
		const statSpy = vi.spyOn(file, "stat");

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
		expect(statSpy).not.toHaveBeenCalled();
	});

	it("falls back to empty mime type in async parse when metadata and extension are missing", async() => {
		const schema = DServerDataParser.file({
			mimeType: /^text\/plain$/,
			checkExist: true,
		});
		const file = DServerFile.createFileInterface("/tmp/no-extension");
		const statSpy = vi.spyOn(file, "stat");

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
		expect(statSpy).not.toHaveBeenCalled();
	});

	it("fails in async parse when input is not a file interface", async() => {
		const schema = DServerDataParser.file();

		const result = await schema.asyncParse({ path: "/tmp/demo.txt" });

		expect(E.isLeft(result)).toBe(true);
	});

	it("fails when stat result is left", async() => {
		const schema = DServerDataParser.file({ checkExist: true });
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.left("file-system-stat"));

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
	});

	it("fails when size is greater than maxSize", async() => {
		const schema = DServerDataParser.file({ maxSize: 10 });
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 11,
		} as any));

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
	});

	it("fails when size is lower than minSize", async() => {
		const schema = DServerDataParser.file({
			minSize: 10,
		});
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 5,
		} as any));

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
	});

	it("fails when stat says the entry is not a file", async() => {
		const schema = DServerDataParser.file({ checkExist: true });
		const file = DServerFile.createFileInterface("/tmp/demo.txt");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: false,
			sizeBytes: 5,
		} as any));

		const result = await schema.asyncParse(file);

		expect(E.isLeft(result)).toBe(true);
	});

	it("works in pipe with valid file and matching constraints", async() => {
		const schema = pipe(
			{
				mimeType: /^application\/json$/,
				minSize: 1,
				maxSize: 10,
				checkExist: true,
			},
			DServerDataParser.file,
		);
		const file = DServerFile.createFileInterface("/tmp/demo.json");
		vi.spyOn(file, "stat").mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 5,
		} as any));

		const result = await schema.asyncParse(file);

		expect(E.isRight(result)).toBe(true);
		expect(unwrap(result)).toBe(file);
	});

	it("computes isAsynchronous based on async-only options", () => {
		const syncOnlySchema = DServerDataParser.file();
		const checkExistSchema = DServerDataParser.file({ checkExist: true });
		const maxSizeSchema = DServerDataParser.file({ maxSize: 1 });
		const minSizeSchema = DServerDataParser.file({ minSize: 1 });

		expect(syncOnlySchema.isAsynchronous()).toBe(false);
		expect(checkExistSchema.isAsynchronous()).toBe(true);
		expect(maxSizeSchema.isAsynchronous()).toBe(true);
		expect(minSizeSchema.isAsynchronous()).toBe(true);
	});
});
