import { E } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setFsPromisesMock } from "tests/_utils/fsPromises.mock";
import { setDenoMock } from "tests/_utils/deno.mock";

describe("rename", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renames file in NODE env", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});

		const result = await DServerFile.rename("/tmp/file.txt", "new.txt");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/tmp/file.txt", "/tmp/new.txt");
	});

	it("returns fail when NODE rename rejects", async() => {
		setEnvironment("NODE");
		setFsPromisesMock({
			rename: vi.fn().mockRejectedValue(new Error("boom")),
		});

		const result = await DServerFile.rename("/tmp/file.txt", "new.txt");

		expect(E.isLeft(result)).toBe(true);
	});

	it("returns fail when NODE rename receives invalid path", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn(),
		});

		const result = await DServerFile.rename("file.txt", "new.txt");

		expect(E.isLeft(result)).toBe(true);
		expect(fs.rename).not.toHaveBeenCalled();
	});

	it("renames file in NODE env with URL path", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const url = new URL("file:///tmp/url%20file.txt");

		const result = await DServerFile.rename(url, "new.txt");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith(url, "/tmp/new.txt");
	});

	it("renames file in DENO env", async() => {
		setEnvironment("DENO");
		const rename = vi.fn().mockResolvedValue(undefined);
		setDenoMock({ rename });

		const result = await DServerFile.rename("/tmp/file.txt", "new.txt");

		expect(E.isRight(result)).toBe(true);
		expect(rename).toHaveBeenCalledWith("/tmp/file.txt", "/tmp/new.txt");
	});

	it("renames file in DENO env with URL path", async() => {
		setEnvironment("DENO");
		const rename = vi.fn().mockResolvedValue(undefined);
		setDenoMock({ rename });
		const url = new URL("file:///tmp/url%20file.txt");

		const result = await DServerFile.rename(url, "new.txt");

		expect(E.isRight(result)).toBe(true);
		expect(rename).toHaveBeenCalledWith(url, "/tmp/new.txt");
	});

	it("returns fail when DENO rename rejects", async() => {
		setEnvironment("DENO");
		setDenoMock({
			rename: vi.fn().mockRejectedValue(new Error("boom")),
		});

		const result = await DServerFile.rename("/tmp/file.txt", "new.txt");

		expect(E.isLeft(result)).toBe(true);
	});

	it("returns fail when DENO rename receives invalid path", async() => {
		setEnvironment("DENO");
		const rename = vi.fn();
		setDenoMock({ rename });

		const result = await DServerFile.rename("file.txt", "new.txt");

		expect(E.isLeft(result)).toBe(true);
		expect(rename).not.toHaveBeenCalled();
	});
});
