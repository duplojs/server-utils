import { type ExpectType, pipe } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("createBooleanOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns false when option is missing", () => {
		const option = DServerCommand.createBooleanOption("help");
		const result = option.execute(["subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			boolean,
			"strict"
		>;

		expect(result.result).toBe(false);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns true when option is present", () => {
		const option = DServerCommand.createBooleanOption("help");
		const result = option.execute(["--help", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe(true);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns true when alias is present", () => {
		const option = DServerCommand.createBooleanOption("help", { aliases: ["h"] });
		const result = option.execute(["-h", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe(true);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when a value is provided", () => {
		const option = DServerCommand.createBooleanOption("help");
		const error = createError("root");

		expect(option.execute(["--help=true"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("option without value --help");
	});
});
