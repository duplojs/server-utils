import { E } from "@duplojs/utils";
import { DServerFile, setEnvironment } from "@scripts";
import { setFsPromisesMock } from "tests/_utils/fsPromises.mock";
import { setDenoMock } from "tests/_utils/deno.mock";

describe("truncate", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("truncates file in NODE env", async() => {
		setEnvironment("NODE");
		const fs = setFsPromisesMock({
			truncate: vi.fn().mockResolvedValue(undefined),
		});

		const result = await DServerFile.truncate("/tmp/mock", 10);

		expect(E.isRight(result)).toBe(true);
		expect(fs.truncate).toHaveBeenCalledWith("/tmp/mock", 10);
	});

	it("returns fail when NODE truncate rejects", async() => {
		setEnvironment("NODE");
		setFsPromisesMock({
			truncate: vi.fn().mockRejectedValue(new Error("boom")),
		});

		const result = await DServerFile.truncate("/tmp/mock", 10);

		expect(E.isLeft(result)).toBe(true);
	});

	it("truncates file in DENO env with URL", async() => {
		setEnvironment("DENO");
		const truncate = vi.fn().mockResolvedValue(undefined);
		setDenoMock({ truncate });

		const result = await DServerFile.truncate(new URL("file:///tmp/mock%20file"), 5);

		expect(E.isRight(result)).toBe(true);
		expect(truncate).toHaveBeenCalledWith("/tmp/mock file", 5);
	});

	it("returns fail when DENO truncate rejects", async() => {
		setEnvironment("DENO");
		setDenoMock({
			truncate: vi.fn().mockRejectedValue(new Error("boom")),
		});

		const result = await DServerFile.truncate("/tmp/mock", 5);

		expect(E.isLeft(result)).toBe(true);
	});
});
