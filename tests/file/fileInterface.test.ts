import { E, unwrap } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setFsPromisesMock } from "tests/_utils/fsPromises.mock";

function createNodeStatsMock() {
	const now = new Date("2020-01-01T00:00:00Z");
	return {
		isFile: () => true,
		isDirectory: () => false,
		isSymbolicLink: () => false,
		size: 123,
		mtime: now,
		atime: now,
		birthtime: now,
		ctime: now,
		dev: 1,
		ino: 2,
		mode: 3,
		nlink: 4,
		uid: 5,
		gid: 6,
		rdev: 7,
		blksize: 8,
		blocks: 9,
		isBlockDevice: () => false,
		isCharacterDevice: () => false,
		isFIFO: () => false,
		isSocket: () => false,
	};
}

describe("fileInterface", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("creates interface with name and mime info", () => {
		const file = DServerFile.createFileInterface("/tmp/example.json");

		expect(file.name).toBe("example.json");
		expect(file.extension).toBe("json");
		expect(file.mimeType).toBe("application/json");
		expect(file.getParentPath()).toBe("/tmp");
	});

	it("creates interface from URL and handles unknown extension", () => {
		const file = DServerFile.createFileInterface(new URL("file:///tmp/unknown%20file.zzz"));

		expect(file.path).toBe("/tmp/unknown file.zzz");
		expect(file.extension).toBe(null);
		expect(file.mimeType).toBe(null);
	});

	it("returns empty parent path when no separator is present", () => {
		const file = DServerFile.createFileInterface("file");

		expect(file.name).toBe("file");
		expect(file.getParentPath()).toBe("");
	});

	it("renames file and returns new interface", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.rename("next.json");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/tmp/example.json", "/tmp/next.json");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/next.json");
		}
	});

	it("checks existence via fs access", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			access: vi.fn().mockResolvedValue(undefined),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.exist();

		expect(E.isRight(result)).toBe(true);
		expect(fs.access).toHaveBeenCalledWith("/tmp/example.json");
	});

	it("removes file via fs rm", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rm: vi.fn().mockResolvedValue(undefined),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.remove();

		expect(E.isRight(result)).toBe(true);
		expect(fs.rm).toHaveBeenCalledWith("/tmp/example.json", {
			recursive: undefined,
			force: true,
		});
	});

	it("reads stat info via fs stat", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			stat: vi.fn().mockResolvedValue(createNodeStatsMock()),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.stat();

		expect(E.isRight(result)).toBe(true);
		expect(fs.stat).toHaveBeenCalledWith("/tmp/example.json");
		if (E.isRight(result)) {
			expect(unwrap(result).sizeBytes).toBe(123);
		}
	});

	it("relocates file using move", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.relocate("/new/parent");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/new/parent", "/tmp/example.json");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/example.json");
		}
	});

	it("relocates file using move with URL parent path", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const file = DServerFile.createFileInterface("/tmp/example.json");

		const result = await file.relocate(new URL("file:///new/parent%20path"));

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/new/parent path", "/tmp/example.json");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/example.json");
		}
	});
});
