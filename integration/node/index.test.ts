import { describe, expect, it } from "vitest";
import { E, unwrap, A } from "@duplojs/utils";
import { SF } from "@duplojs/server-utils";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const makeTempDir = async() => fs.mkdtemp(path.join(os.tmpdir(), "duplojs-node-"));

describe("node integration", () => {
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

		const writeResult = await SF.writeTextFile(filePath, "hello node");
		expect(E.isRight(writeResult)).toBe(true);

		const readResult = await SF.readTextFile(filePath);
		expect(E.isRight(readResult)).toBe(true);
		expect(unwrap(readResult)).toBe("hello node");

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

		await fs.writeFile(sourcePath, encoder.encode("copy me"));

		const copyResult = await SF.copy(sourcePath, targetPath);
		expect(E.isRight(copyResult)).toBe(true);

		const copied = await fs.readFile(targetPath, "utf8");
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

		await fs.writeFile(sourcePath, "move me");

		const moveResult = await SF.move(sourcePath, targetPath);
		expect(E.isRight(moveResult)).toBe(true);

		await expect(fs.stat(sourcePath)).rejects.toThrow();
		const moved = await fs.readFile(targetPath, "utf8");
		expect(moved).toBe("move me");

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});

	it("remove", async() => {
		const tempDir = await makeTempDir();
		const filePath = path.join(tempDir, "remove.txt");

		await fs.writeFile(filePath, "remove me");

		const removeResult = await SF.remove(filePath);
		expect(E.isRight(removeResult)).toBe(true);

		await expect(fs.stat(filePath)).rejects.toThrow();

		await fs.rm(tempDir, {
			recursive: true,
			force: true,
		});
	});
});
