import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertRejects } from "@std/assert";
import { E, unwrap, A } from "@duplojs/utils";
import { SF } from "@duplojs/server-utils";

describe("deno integration", () => {
	it("readFile/writeFile", async() => {
		const tempDir = await Deno.makeTempDir();
		const filePath = `${tempDir}/binary.bin`;

		const writeResult = await SF.writeFile(filePath, new Uint8Array([1, 2, 3]));
		assert(E.isRight(writeResult));

		const readResult = await SF.readFile(filePath);

		assert(E.isRight(readResult));
		assertEquals(A.from(unwrap(readResult)), [1, 2, 3]);

		await Deno.remove(tempDir, { recursive: true });
	});

	it("readTextFile/writeTextFile", async() => {
		const tempDir = await Deno.makeTempDir();
		const filePath = `${tempDir}/text.txt`;

		const writeResult = await SF.writeTextFile(filePath, "hello deno");
		assert(E.isRight(writeResult));

		const readResult = await SF.readTextFile(filePath);
		assert(E.isRight(readResult));
		assertEquals(unwrap(readResult), "hello deno");

		await Deno.remove(tempDir, { recursive: true });
	});

	it("copy", async() => {
		const tempDir = await Deno.makeTempDir();
		const sourcePath = `${tempDir}/source.txt`;
		const targetPath = `${tempDir}/copy.txt`;
		const encoder = new TextEncoder();

		await Deno.writeFile(sourcePath, encoder.encode("copy me"));

		const copyResult = await SF.copy(sourcePath, targetPath);
		assert(E.isRight(copyResult));

		const copied = await Deno.readTextFile(targetPath);
		assertEquals(copied, "copy me");

		await Deno.remove(tempDir, { recursive: true });
	});

	it("move", async() => {
		const tempDir = await Deno.makeTempDir();
		const sourcePath = `${tempDir}/move.txt`;
		const targetPath = `${tempDir}/moved.txt`;

		await Deno.writeTextFile(sourcePath, "move me");

		const moveResult = await SF.move(sourcePath, targetPath);
		assert(E.isRight(moveResult));

		await assertRejects(() => Deno.stat(sourcePath), Deno.errors.NotFound);
		assertEquals(await Deno.readTextFile(targetPath), "move me");

		await Deno.remove(tempDir, { recursive: true });
	});

	it("remove", async() => {
		const tempDir = await Deno.makeTempDir();
		const filePath = `${tempDir}/remove.txt`;

		await Deno.writeTextFile(filePath, "remove me");

		const removeResult = await SF.remove(filePath);
		assert(E.isRight(removeResult));

		await assertRejects(() => Deno.stat(filePath), Deno.errors.NotFound);

		await Deno.remove(tempDir, { recursive: true });
	});
});
