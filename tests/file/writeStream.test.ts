import { E, type ExpectType } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setDenoMock } from "../_utils/deno.mock";
import { setBunMock, clearBunMock } from "../_utils/bun.mock";

const createWriteStreamMock = vi.fn();
const readableFromMock = vi.fn();
const pipelineMock = vi.fn();

vi.mock("node:fs", () => ({
	createWriteStream: createWriteStreamMock,
}));

vi.mock("node:stream", () => ({
	Readable: {
		from: readableFromMock,
	},
	promises: {
		pipeline: pipelineMock,
	},
}));

describe("writeStream", () => {
	afterEach(() => {
		setEnvironment("NODE");
		vi.clearAllMocks();
		vi.restoreAllMocks();
		clearBunMock();
	});

	it("writes stream in NODE env", async() => {
		setEnvironment("NODE");
		const source = {
			async *[Symbol.asyncIterator]() {
				await Promise.resolve();
				yield new Uint8Array([1]);
				await Promise.resolve();
				yield new Uint8Array([2, 3]);
			},
		};
		const readable = {};
		const writable = {};
		readableFromMock.mockReturnValue(readable);
		createWriteStreamMock.mockReturnValue(writable);
		pipelineMock.mockResolvedValue(undefined);

		const result = await DServerFile.writeStream("/tmp/mock", source);

		type _CheckResult = ExpectType<
			typeof result,
			E.Ok | DServerFile.FileSystemLeft<"write-stream">,
			"strict"
		>;

		expect(E.isRight(result)).toBe(true);
		expect(readableFromMock).toHaveBeenCalledWith(source);
		expect(createWriteStreamMock).toHaveBeenCalledWith("/tmp/mock");
		expect(pipelineMock).toHaveBeenCalledWith(readable, writable);
	});

	it("returns fail when NODE pipeline rejects", async() => {
		setEnvironment("NODE");
		const source = {
			async *[Symbol.asyncIterator]() {
				await Promise.resolve();
				yield new Uint8Array([1]);
			},
		};
		readableFromMock.mockReturnValue({});
		createWriteStreamMock.mockReturnValue({});
		pipelineMock.mockRejectedValue(new Error("boom"));

		const result = await DServerFile.writeStream("/tmp/mock", source);

		expect(E.isLeft(result)).toBe(true);
	});

	it("writes stream in DENO env and closes file", async() => {
		setEnvironment("DENO");
		const write = vi.fn().mockResolvedValue(1);
		const close = vi.fn();
		const create = vi.fn().mockResolvedValue({
			write,
			close,
		});

		setDenoMock({ create });

		const result = await DServerFile.writeStream(
			"/tmp/mock",
			{
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([4]);
					await Promise.resolve();
					yield new Uint8Array([5, 6]);
				},
			},
		);

		expect(E.isRight(result)).toBe(true);
		expect(create).toHaveBeenCalledWith("/tmp/mock");
		expect(write).toHaveBeenNthCalledWith(1, new Uint8Array([4]));
		expect(write).toHaveBeenNthCalledWith(2, new Uint8Array([5, 6]));
		expect(close).toHaveBeenCalledTimes(1);
	});

	it("returns fail when DENO create rejects", async() => {
		setEnvironment("DENO");
		setDenoMock({
			create: vi.fn().mockRejectedValue(new Error("boom")),
		});

		const result = await DServerFile.writeStream(
			"/tmp/mock",
			{
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([7]);
				},
			},
		);

		expect(E.isLeft(result)).toBe(true);
	});

	it("returns fail and closes file when DENO write rejects", async() => {
		setEnvironment("DENO");
		const close = vi.fn();
		setDenoMock({
			create: vi.fn().mockResolvedValue({
				write: vi.fn().mockRejectedValue(new Error("boom")),
				close,
			}),
		});

		const result = await DServerFile.writeStream(
			"/tmp/mock",
			{
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([8]);
				},
			},
		);

		expect(E.isLeft(result)).toBe(true);
		expect(close).toHaveBeenCalledTimes(1);
	});

	it("writes stream in BUN env", async() => {
		setEnvironment("BUN");
		const write = vi.fn();
		const end = vi.fn().mockResolvedValue(undefined);
		const file = vi.fn().mockReturnValue({
			writer: vi.fn().mockReturnValue({
				write,
				end,
			}),
		});
		setBunMock({ file });

		const result = await DServerFile.writeStream(
			"/tmp/mock",
			{
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([9]);
					await Promise.resolve();
					yield new Uint8Array([10, 11]);
				},
			},
		);

		expect(E.isRight(result)).toBe(true);
		expect(file).toHaveBeenCalledWith("/tmp/mock");
		expect(write).toHaveBeenNthCalledWith(1, new Uint8Array([9]));
		expect(write).toHaveBeenNthCalledWith(2, new Uint8Array([10, 11]));
		expect(end).toHaveBeenCalledTimes(1);
	});

	it("returns fail when BUN writer end rejects", async() => {
		setEnvironment("BUN");
		setBunMock({
			file: vi.fn().mockReturnValue({
				writer: vi.fn().mockReturnValue({
					write: vi.fn(),
					end: vi.fn().mockRejectedValue(new Error("boom")),
				}),
			}),
		});

		const result = await DServerFile.writeStream(
			"/tmp/mock",
			{
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([12]);
				},
			},
		);

		expect(E.isLeft(result)).toBe(true);
	});
});
