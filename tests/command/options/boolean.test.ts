import { type ExpectType, pipe } from "@duplojs/utils";
import { ServerCommand } from "@scripts";

describe("createBooleanOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns false when option is missing", () => {
		const option = ServerCommand.createBooleanOption("help");

		const result = option.execute(["subject"]);

		type _CheckResult = ExpectType<
			typeof result.result,
			boolean,
			"strict"
		>;

		expect(result.result).toBe(false);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns true when option is present", () => {
		const option = ServerCommand.createBooleanOption("help");

		const result = option.execute(["--help", "subject"]);

		expect(result.result).toBe(true);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns true when alias is present", () => {
		const option = ServerCommand.createBooleanOption("help", { aliases: ["h"] });

		const result = option.execute(["-h", "subject"]);

		expect(result.result).toBe(true);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when a value is provided", () => {
		const option = ServerCommand.createBooleanOption("help");

		expect(() => option.execute(["--help=true"])).toThrowError(ServerCommand.CommandOptionValueNotRequiredError);
	});

	it("works when called from pipe", () => {
		const option = ServerCommand.createBooleanOption("help");

		const result = pipe(["--help"], option.execute);

		expect(result.result).toBe(true);
	});
});
