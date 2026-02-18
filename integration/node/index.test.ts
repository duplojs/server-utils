import { describe, expect, it, vi } from "vitest";
import { type ExpectType, E, unwrap, A, DP } from "@duplojs/utils";
import { SF, setEnvironment, TESTImplementation, environmentVariable, SC } from "@duplojs/server-utils";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const makeTempDir = async() => fs.mkdtemp(path.join(os.tmpdir(), "duplojs-node-"));
const envApplicationPath = fileURLToPath(new URL("../fixtures/env/application.env", import.meta.url));
const envServicePath = fileURLToPath(new URL("../fixtures/env/service.env", import.meta.url));
const envRuntimePath = fileURLToPath(new URL("../fixtures/env/runtime.env", import.meta.url));
// eslint-disable-next-line no-control-regex
const stripAnsiColor = (value: string) => value.replace(/\u001B\[[0-9;]*m/g, "");

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

	it("environmentVariable normal", async() => {
		const initialEnv = process.env;
		try {
			process.env = {
				BASE_NAME: "node-runtime",
			};

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

			expect(E.isRight(result)).toBe(true);
			expect(process.env.BASE_NAME).toBe("node-runtime");
			expect(process.env.APP_NAME).toBe("core-app");
			expect(process.env.API_URL).toBe("https://api.duplo.local/v1");
			expect(process.env.LOG_LABEL).toBe("[service]");
			expect(process.env.MULTILINE).toBe("line1\nline2\r");
			expect(process.env.ESCAPED).toBe("$TOKEN");
		} finally {
			process.env = initialEnv;
		}
	});

	it("environmentVariable override", async() => {
		const initialEnv = process.env;
		try {
			process.env = {
				BASE_NAME: "node-runtime",
				APP_NAME: "base-app",
			};

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

			expect(E.isRight(result)).toBe(true);
			expect(process.env.BASE_NAME).toBe("service");
			expect(process.env.APP_NAME).toBe("runtime-app");
			expect(process.env.API_PREFIX).toBe("/v2");
			expect(process.env.COMPOSED).toBe("service/v2");
			expect(process.env.NEW_KEY).toBe("runtime");
		} finally {
			process.env = initialEnv;
		}
	});

	it("environmentVariable justRead", async() => {
		const initialEnv = process.env;
		try {
			process.env = {
				BASE_NAME: "node-runtime",
				APP_NAME: "base-app",
			};

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

			expect(E.isRight(result)).toBe(true);
			if (E.isRight(result)) {
				expect(unwrap(result).BASE_NAME).toBe("core");
				expect(unwrap(result).APP_NAME).toBe("runtime-app");
				expect(unwrap(result).COMPOSED).toBe("core/v2");
			}
			expect(process.env.APP_NAME).toBe("base-app");
			expect(process.env.COMPOSED).toBeUndefined();
		} finally {
			process.env = initialEnv;
		}
	});

	it("command integration with nested help and execute", async() => {
		setEnvironment("TEST");

		const exitSpy = vi.fn();
		const getProcessArgumentsSpy = vi.fn();
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
		const rootExecuteSpy = vi.fn();
		const commandExecuteSpy = vi.fn();
		const subCommandExecuteSpy = vi.fn();
		const subHelpExecuteSpy = vi.fn();

		TESTImplementation.set("exitProcess", exitSpy);
		TESTImplementation.set("getProcessArguments", getProcessArgumentsSpy);

		const subHelpCommand = SC.create(
			"help-db",
			subHelpExecuteSpy,
		);

		const subCommand = SC.create(
			"seed",
			{
				description: "Seed a target",
				options: [
					SC.createBooleanOption(
						"force",
						{
							aliases: ["f"],
							description: "force execution",
						},
					),
				],
				subject: DP.tuple([DP.string()]),
			},
			({ options, subject }) => {
				type _CheckOptions = ExpectType<
					typeof options,
					{
						force: boolean;
					},
					"strict"
				>;
				type _CheckSubject = ExpectType<
					typeof subject,
					[string] | undefined,
					"strict"
				>;

				subCommandExecuteSpy({
					options,
					subject,
				});
			},
		);

		const command = SC.create(
			"db",
			{
				description: "Database commands",
				subject: [subHelpCommand, subCommand],
			},
			commandExecuteSpy,
		);

		try {
			getProcessArgumentsSpy.mockReturnValue(["--help"]);
			await SC.exec(
				{
					subject: [command],
				},
				rootExecuteSpy,
			);

			expect(logSpy).toHaveBeenCalled();
			expect(
				stripAnsiColor(
					logSpy.mock.calls.map((call) => call.join("")).join("\n"),
				),
			).toMatchSnapshot("help root");

			logSpy.mockClear();
			await command.execute(["--help"]);
			expect(
				stripAnsiColor(
					logSpy.mock.calls.map((call) => call.join("")).join("\n"),
				),
			).toMatchSnapshot("help command");

			logSpy.mockClear();
			await command.execute(["help-db", "--help"]);
			expect(
				stripAnsiColor(
					logSpy.mock.calls.map((call) => call.join("")).join("\n"),
				),
			).toMatchSnapshot("help sub-command");

			await command.execute(["seed", "--force", "users"]);
			expect(subCommandExecuteSpy).toHaveBeenCalledWith({
				options: {
					force: true,
				},
				subject: ["users"],
			});
		} finally {
			setEnvironment("NODE");
			TESTImplementation.clear();
			logSpy.mockRestore();
		}
	});
});
