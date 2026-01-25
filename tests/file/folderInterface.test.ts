import { E, unwrap } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setFsPromisesMock } from "tests/_utils/fsPromises.mock";

function createNodeStatsMock() {
	const now = new Date("2020-01-01T00:00:00Z");
	return {
		isFile: () => false,
		isDirectory: () => true,
		isSymbolicLink: () => false,
		size: 456,
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

describe("folderInterface", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("creates interface and trims trailing slash", () => {
		const folder = DServerFile.createFolderInterface("/tmp/demo/");

		expect(folder.name).toBe("demo");
		expect(folder.path).toBe("/tmp/demo");
		expect(folder.getParentPath()).toBe("/tmp");
	});

	it("creates interface from URL", () => {
		const folder = DServerFile.createFolderInterface(new URL("file:///tmp/url%20demo/"));

		expect(folder.name).toBe("url demo");
		expect(folder.path).toBe("/tmp/url demo");
	});

	it("returns empty parent path when no separator is present", () => {
		const folder = DServerFile.createFolderInterface("folder");

		expect(folder.name).toBe("folder");
		expect(folder.getParentPath()).toBe("");
	});

	it("renames folder and returns new interface", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.rename("next");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/tmp/demo", "/tmp/next");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/next");
		}
	});

	it("relocates folder using move", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.relocate("/new/parent");

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/new/parent", "/tmp/demo");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/demo");
		}
	});

	it("relocates folder using move with URL parent path", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rename: vi.fn().mockResolvedValue(undefined),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.relocate(new URL("file:///new/parent%20path/"));

		expect(E.isRight(result)).toBe(true);
		expect(fs.rename).toHaveBeenCalledWith("/new/parent path/", "/tmp/demo");
		if (E.isRight(result)) {
			expect(unwrap(result).path).toBe("/tmp/demo");
		}
	});

	it("checks existence via fs access", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			access: vi.fn().mockResolvedValue(undefined),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.exist();

		expect(E.isRight(result)).toBe(true);
		expect(fs.access).toHaveBeenCalledWith("/tmp/demo");
	});

	it("removes folder recursively", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			rm: vi.fn().mockResolvedValue(undefined),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.remove();

		expect(E.isRight(result)).toBe(true);
		expect(fs.rm).toHaveBeenCalledWith("/tmp/demo", {
			recursive: true,
			force: true,
		});
	});

	it("reads children via readDirectory", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			readdir: vi.fn().mockResolvedValue(["a", "b"]),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.getChildren();

		expect(E.isRight(result)).toBe(true);
		expect(fs.readdir).toHaveBeenCalledWith("/tmp/demo", { recursive: undefined });
		if (E.isRight(result)) {
			expect(unwrap(result)).toEqual(["a", "b"]);
		}
	});

	it("reads stat info via fs stat", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			stat: vi.fn().mockResolvedValue(createNodeStatsMock()),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.stat();

		expect(E.isRight(result)).toBe(true);
		expect(fs.stat).toHaveBeenCalledWith("/tmp/demo");
		if (E.isRight(result)) {
			expect(unwrap(result).sizeBytes).toBe(456);
		}
	});

	it("walks directory and maps entries", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			readdir: vi.fn().mockResolvedValue([
				{
					parentPath: "/tmp/demo",
					name: "file.json",
					isFile: () => true,
					isDirectory: () => false,
				},
			]),
		});
		const folder = DServerFile.createFolderInterface("/tmp/demo");

		const result = await folder.walk();

		expect(E.isRight(result)).toBe(true);
		expect(fs.readdir).toHaveBeenCalledWith("/tmp/demo", {
			recursive: true,
			withFileTypes: true,
		});
		if (E.isRight(result)) {
			const items = Array.from(unwrap(result));
			expect(items[0]?.name).toBe("file.json");
		}
	});
});
