import { type ExpectType, DP, DPE, S } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("createOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns undefined when optional option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;

		expect(result.result).toBeUndefined();
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses inline value for optional option", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["--name=duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value for optional option", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["--name", "duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when required option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });
		const error = createError("root");

		expect(option.execute(["subject"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("required option --name");
	});

	it("parses value when required option is present", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });
		const result = option.execute(["--name=duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			string,
			"strict"
		>;

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when value cannot be parsed by schema", () => {
		const option = DServerCommand.createOption("enabled", DP.boolean() as never);
		const error = createError("root");

		expect(option.execute(["--enabled=yes"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("boolean");
	});

	it("supports transform schema and keeps transformed output type", () => {
		const option = DServerCommand.createOption(
			"size",
			DP.transform(
				DP.string(),
				(value) => value.length,
			),
		);

		const result = option.execute(["--size=duplo"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			number | undefined,
			"strict"
		>;

		expect(result.result).toBe(5);
	});

	it("supports optional option with pipe schema without crashing at execute", () => {
		const option = DServerCommand.createOption(
			"name",
			DPE.string().transform(
				S.toLowerCase,
			),
		);

		const missingResult = option.execute(["subject"], createError("root"));
		const result = option.execute(["--name=PABLO"], createError("root"));
		expect(missingResult).not.toBe(SymbolCommandError);
		expect(result).not.toBe(SymbolCommandError);
		if (missingResult === SymbolCommandError || result === SymbolCommandError) {
			return;
		}

		type _CheckMissingResult = ExpectType<
			typeof missingResult.result,
			Lowercase<string> | undefined,
			"strict"
		>;

		type _CheckResult = ExpectType<
			typeof result.result,
			Lowercase<string> | undefined,
			"strict"
		>;

		expect(missingResult.result).toBeUndefined();
		expect(result.result).toBe("pablo");
		expect(result.argumentRest).toEqual([]);
	});

	it("support required", () => {
		const option = DServerCommand.createOption(
			"name",
			DPE.string(),
			{ required: true },
		);

		const result = option.execute(["--name=guest"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			string,
			"strict"
		>;

		expect(result.result).toBe("guest");
		expect(result.argumentRest).toEqual([]);
	});

	it("support optional dataParser", () => {
		const optionOptionalRequired = DServerCommand.createOption(
			"name",
			DPE.string().optional(),
			{ required: true },
		);

		const result = optionOptionalRequired.execute(["--name=guest"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}
		type _check = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;
		expect(result.result).toBe("guest");

		const optionOptionalNotRequired = DServerCommand.createOption(
			"name",
			DPE.string().optional(),
		);

		const result1 = optionOptionalNotRequired.execute(["--name=guest"], createError("root"));
		expect(result1).not.toBe(SymbolCommandError);
		if (result1 === SymbolCommandError) {
			return;
		}
		type _check1 = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;
		expect(result.result).toBe("guest");
	});
});
