import { type ExpectType, pipe } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setDenoMock } from "../_utils/deno.mock";
import { setBunMock, clearBunMock } from "../_utils/bun.mock";

const createReadStreamMock = vi.fn();

vi.mock("node:fs", () => ({
	createReadStream: createReadStreamMock,
}));

describe("readStream", () => {
	afterEach(() => {
		setEnvironment("NODE");
		vi.clearAllMocks();
		vi.restoreAllMocks();
		clearBunMock();
	});

	it("reads stream in NODE env", async() => {
		setEnvironment("NODE");
		createReadStreamMock.mockReturnValue({
			async *[Symbol.asyncIterator]() {
				await Promise.resolve();
				yield Buffer.from([1, 2]);
				await Promise.resolve();
				yield Buffer.from([3]);
			},
		});

		const result = DServerFile.readStream("/tmp/mock");

		type _CheckResult = ExpectType<
			typeof result,
			AsyncGenerator<Uint8Array>,
			"strict"
		>;

		const chunks: number[][] = [];
		for await (const chunk of result) {
			chunks.push(Array.from(chunk));
		}

		expect(createReadStreamMock).toHaveBeenCalledWith("/tmp/mock");
		expect(chunks).toEqual([[1, 2], [3]]);
	});

	it("reads stream in DENO env and closes file", async() => {
		setEnvironment("DENO");
		const close = vi.fn();
		const open = vi.fn().mockResolvedValue({
			readable: {
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([4, 5]);
					await Promise.resolve();
					yield new Uint8Array([6]);
				},
			},
			close,
		});
		setDenoMock({ open });

		const result = DServerFile.readStream("/tmp/mock");
		const chunks: number[][] = [];

		for await (const chunk of result) {
			chunks.push(Array.from(chunk));
		}

		expect(open).toHaveBeenCalledWith("/tmp/mock");
		expect(close).toHaveBeenCalledTimes(1);
		expect(chunks).toEqual([[4, 5], [6]]);
	});

	it("closes file when DENO stream iteration throws", async() => {
		setEnvironment("DENO");
		const close = vi.fn();
		setDenoMock({
			open: vi.fn().mockResolvedValue({
				readable: {
					async *[Symbol.asyncIterator]() {
						await Promise.resolve();
						yield new Uint8Array([7]);
						throw new Error("boom");
					},
				},
				close,
			}),
		});

		const result = DServerFile.readStream("/tmp/mock");
		const chunks: number[][] = [];

		await expect(async() => {
			for await (const chunk of result) {
				chunks.push(Array.from(chunk));
			}
		}).rejects.toThrow("boom");

		expect(close).toHaveBeenCalledTimes(1);
		expect(chunks).toEqual([[7]]);
	});

	it("reads stream in BUN env", async() => {
		setEnvironment("BUN");
		const file = vi.fn().mockReturnValue({
			stream: vi.fn().mockReturnValue({
				async *[Symbol.asyncIterator]() {
					await Promise.resolve();
					yield new Uint8Array([8]);
					await Promise.resolve();
					yield new Uint8Array([9, 10]);
				},
			}),
		});
		setBunMock({ file });

		const result = DServerFile.readStream("/tmp/mock");
		const chunks: number[][] = [];

		for await (const chunk of result) {
			chunks.push(Array.from(chunk));
		}

		expect(file).toHaveBeenCalledWith("/tmp/mock");
		expect(chunks).toEqual([[8], [9, 10]]);
	});
});
