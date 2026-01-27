import { describe, expect, it } from "bun:test";
import { E, unwrap, A } from "@duplojs/utils";
import { SF } from "@duplojs/server-utils";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const makeTempDir = async() => fs.mkdtemp(path.join(os.tmpdir(), "duplojs-bun-"));

describe("bun integration", () => {
	it("readFile/writeFile", async() => {
		const tempDir = await makeTempDir();
		const filePath = path.join(tempDir, "binary.bin");

		const writeResult = await SF.writeFile(filePath, new Uint8Array([1, 2, 3]));
		expect(E.isRight(writeResult)).toBe(true);

		const readResult = await SF.readFile(filePath);
		expect(E.isRight(readResult)).toBe(true);
		if (E.isRight(readResult)) {
			expect(A.from(unwrap(readResult))).toEqual([1, 2, 3]);
		}

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});

	it("readTextFile/writeTextFile", async() => {
		const tempDir = await makeTempDir();
		const filePath = path.join(tempDir, "text.txt");

		const writeResult = await SF.writeTextFile(filePath, "hello bun");
		expect(E.isRight(writeResult)).toBe(true);

		const readResult = await SF.readTextFile(filePath);
		expect(E.isRight(readResult)).toBe(true);
		expect(unwrap(readResult)).toBe("hello bun");

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});

	it("copy", async() => {
		const tempDir = await makeTempDir();
		const sourcePath = path.join(tempDir, "source.txt");
		const targetPath = path.join(tempDir, "copy.txt");
		const encoder = new TextEncoder();

		await Bun.write(sourcePath, encoder.encode("copy me"));

		const copyResult = await SF.copy(sourcePath, targetPath);
		expect(E.isRight(copyResult)).toBe(true);

		const copied = await Bun.file(targetPath).text();
		expect(copied).toBe("copy me");

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});

	it("move", async() => {
		const tempDir = await makeTempDir();
		const sourcePath = path.join(tempDir, "move.txt");
		const targetPath = path.join(tempDir, "moved.txt");

		await Bun.write(sourcePath, "move me");

		const moveResult = await SF.move(sourcePath, targetPath);
		expect(E.isRight(moveResult)).toBe(true);

		const sourceExists = await Bun.file(sourcePath).exists();
		expect(sourceExists).toBe(false);
		const moved = await Bun.file(targetPath).text();
		expect(moved).toBe("move me");

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});

	it("remove", async() => {
		const tempDir = await makeTempDir();
		const filePath = path.join(tempDir, "remove.txt");

		await Bun.write(filePath, "remove me");

		const removeResult = await SF.remove(filePath);
		expect(E.isRight(removeResult)).toBe(true);

		const exists = await Bun.file(filePath).exists();
		expect(exists).toBe(false);

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});
});
