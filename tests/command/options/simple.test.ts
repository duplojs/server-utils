import { type ExpectType, DP, pipe } from "@duplojs/utils";
import { ServerCommand } from "@scripts";

describe("createOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns undefined when optional option is missing", () => {
		const option = ServerCommand.createOption("name", DP.string());

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
		const option = ServerCommand.createOption("name", DP.string());

		const result = option.execute(["--name=duplo", "subject"]);

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value for optional option", () => {
		const option = ServerCommand.createOption("name", DP.string());

		const result = option.execute(["--name", "duplo", "subject"]);

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when required option is missing", () => {
		const option = ServerCommand.createOption("name", DP.string(), { required: true });

		expect(() => option.execute(["subject"])).toThrowError(ServerCommand.CommandOptionRequiredError);
	});

	it("parses value when required option is present", () => {
		const option = ServerCommand.createOption("name", DP.string(), { required: true });

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
		const option = ServerCommand.createOption("enabled", DP.boolean() as never);

		expect(() => option.execute(["--enabled=yes"])).toThrow();
	});

	it("works when called from pipe", () => {
		const option = ServerCommand.createOption("name", DP.string());

		const result = pipe(["--name=duplo"], option.execute);

		expect(result.result).toBe("duplo");
	});
});
