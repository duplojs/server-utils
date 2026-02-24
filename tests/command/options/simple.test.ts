import { type ExpectType, DP, DPE, S } from "@duplojs/utils";
import { DServerCommand } from "@scripts";

describe("createOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns undefined when optional option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string());

		const result = option.execute(["subject"]);

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

		const result = option.execute(["--name=duplo", "subject"]);

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value for optional option", () => {
		const option = DServerCommand.createOption("name", DP.string());

		const result = option.execute(["--name", "duplo", "subject"]);

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when required option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });

		expect(() => option.execute(["subject"])).toThrowError(DServerCommand.CommandOptionRequiredError);
	});

	it("parses value when required option is present", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });

		const result = option.execute(["--name=duplo", "subject"]);

		type _CheckResult = ExpectType<
			typeof result.result,
			string,
			"strict"
		>;

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when value cannot be parsed by schema", () => {
		const option = DServerCommand.createOption("enabled", DP.boolean() as never);

		expect(() => option.execute(["--enabled=yes"])).toThrow();
	});

	it("supports transform schema and keeps transformed output type", () => {
		const option = DServerCommand.createOption(
			"size",
			DP.transform(
				DP.string(),
				(value) => value.length,
			),
		);

		const result = option.execute(["--size=duplo"]);

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

		const missingResult = option.execute(["subject"]);
		const result = option.execute(["--name=PABLO"]);

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

		const result = option.execute(["--name=guest"]);

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

		const result = optionOptionalRequired.execute(["--name=guest"]);
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

		const result1 = optionOptionalNotRequired.execute(["--name=guest"]);
		type _check1 = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;
		expect(result.result).toBe("guest");
	});
});
