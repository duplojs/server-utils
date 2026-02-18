import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertRejects } from "@std/assert";
import { E, unwrap, A, DP } from "@duplojs/utils";
import { environmentVariable, SF } from "@duplojs/server-utils";

const envApplicationPath = new URL("../fixtures/env/application.env", import.meta.url).pathname;
const envServicePath = new URL("../fixtures/env/service.env", import.meta.url).pathname;
const envRuntimePath = new URL("../fixtures/env/runtime.env", import.meta.url).pathname;

function restoreDenoEnv(snapshot: Record<string, string>) {
	const current = Deno.env.toObject();
	for (const key of Object.keys(current)) {
		if (!(key in snapshot)) {
			Deno.env.delete(key);
		}
	}
	for (const [key, value] of Object.entries(snapshot)) {
		Deno.env.set(key, value);
	}
}

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

	it("environmentVariable normal", async() => {
		const snapshot = Deno.env.toObject();
		try {
			Deno.env.set("BASE_NAME", "deno-runtime");
			Deno.env.delete("APP_NAME");

			const result = await environmentVariable(
				{
					BASE_NAME: DP.string(),
					APP_NAME: DP.string(),
					API_URL: DP.string(),
					LOG_LABEL: DP.string(),
					MULTILINE: DP.string(),
					ESCAPED: DP.string(),
				},
				{
					paths: [envApplicationPath, envServicePath],
					override: false,
					justRead: false,
				},
			);

			assert(E.isRight(result));
			assertEquals(Deno.env.get("BASE_NAME"), "deno-runtime");
			assertEquals(Deno.env.get("APP_NAME"), "core-app");
			assertEquals(Deno.env.get("API_URL"), "https://api.duplo.local/v1");
			assertEquals(Deno.env.get("LOG_LABEL"), "[service]");
			assertEquals(Deno.env.get("MULTILINE"), "line1\nline2\r");
			assertEquals(Deno.env.get("ESCAPED"), "$TOKEN");
		} finally {
			restoreDenoEnv(snapshot);
		}
	});

	it("environmentVariable override", async() => {
		const snapshot = Deno.env.toObject();
		try {
			Deno.env.set("BASE_NAME", "deno-runtime");
			Deno.env.set("APP_NAME", "base-app");

			const result = await environmentVariable(
				{
					BASE_NAME: DP.string(),
					APP_NAME: DP.string(),
					COMPOSED: DP.string(),
					API_PREFIX: DP.string(),
					NEW_KEY: DP.string(),
				},
				{
					paths: [envApplicationPath, envServicePath, envRuntimePath],
					override: true,
					justRead: false,
				},
			);

			assert(E.isRight(result));
			assertEquals(Deno.env.get("BASE_NAME"), "service");
			assertEquals(Deno.env.get("APP_NAME"), "runtime-app");
			assertEquals(Deno.env.get("API_PREFIX"), "/v2");
			assertEquals(Deno.env.get("COMPOSED"), "service/v2");
			assertEquals(Deno.env.get("NEW_KEY"), "runtime");
		} finally {
			restoreDenoEnv(snapshot);
		}
	});

	it("environmentVariable justRead", async() => {
		const snapshot = Deno.env.toObject();
		try {
			Deno.env.set("BASE_NAME", "deno-runtime");
			Deno.env.set("APP_NAME", "base-app");

			const result = await environmentVariable(
				{
					BASE_NAME: DP.string(),
					APP_NAME: DP.string(),
					COMPOSED: DP.string(),
				},
				{
					paths: [envApplicationPath, envRuntimePath],
					override: true,
					justRead: true,
				},
			);

			assert(E.isRight(result));
			if (E.isRight(result)) {
				assertEquals(unwrap(result).BASE_NAME, "core");
				assertEquals(unwrap(result).APP_NAME, "runtime-app");
				assertEquals(unwrap(result).COMPOSED, "core/v2");
			}
			assertEquals(Deno.env.get("APP_NAME"), "base-app");
			assertEquals(Deno.env.get("COMPOSED"), undefined);
		} finally {
			restoreDenoEnv(snapshot);
		}
	});
});
