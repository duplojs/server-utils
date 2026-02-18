import { type ExpectType, DP, pipe } from "@duplojs/utils";
import { DServerCommand } from "@scripts";

describe("createArrayOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns undefined when optional option is missing", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		const result = option.execute(["subject"]);

		type _CheckResult = ExpectType<
			typeof result.result,
			string[] | undefined,
			"strict"
		>;

		expect(result.result).toBeUndefined();
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses comma separated inline values by default", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		const result = option.execute(["--tags=one,two", "subject"]);

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value with custom separator", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { separator: "|" });

		const result = option.execute(["--tags", "one|two", "subject"]);

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when required option is missing", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { required: true });

		expect(() => option.execute(["subject"])).toThrowError(DServerCommand.CommandOptionRequiredError);
	});

	it("throws when min checker is not satisfied", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { min: 2 });

		expect(() => option.execute(["--tags=one"])).toThrow();
	});

	it("throws when max checker is exceeded", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { max: 1 });

		expect(() => option.execute(["--tags=one,two"])).toThrow();
	});

	it("supports aliases", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { aliases: ["t"] });

		const result = option.execute(["-t=one,two", "subject"]);

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("works when called from pipe", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		const result = pipe(["--tags=one,two"], option.execute);

		expect(result.result).toEqual(["one", "two"]);
	});
});
