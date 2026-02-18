import { type ExpectType, pipe } from "@duplojs/utils";
import { ServerCommand } from "@scripts";

describe("initOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("creates an option with default metadata", () => {
		const option = ServerCommand.initOption("verbose", ({ isHere }) => isHere);

		type _CheckName = ExpectType<
			typeof option.name,
			"verbose",
			"strict"
		>;

		expect(option.name).toBe("verbose");
		expect(option.description).toBeNull();
		expect(option.aliases).toEqual([]);
		expect(option.hasValue).toBe(false);
	});

	it("returns fallback execute output and keeps args when option is missing", () => {
		const option = ServerCommand.initOption("verbose", (params) => params);

		const result = option.execute(["--other"]);

		expect(result.result).toEqual({
			isHere: false,
			value: undefined,
		});
		expect(result.argumentRest).toEqual(["--other"]);
	});

	it("detects option by alias and removes the flag from args", () => {
		const option = ServerCommand.initOption("verbose", (params) => params, { aliases: ["v"] });

		const result = option.execute(["-v", "subject"]);

		expect(result.result).toEqual({
			isHere: true,
			value: undefined,
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("extracts inline value when option requires a value", () => {
		const option = ServerCommand.initOption("port", (params) => params, { hasValue: true });

		const result = option.execute(["--port=8080", "subject"]);

		expect(result.result).toEqual({
			isHere: true,
			value: "8080",
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("extracts next argument when option requires a value", () => {
		const option = ServerCommand.initOption("port", (params) => params, { hasValue: true });

		const result = option.execute(["--port", "8080", "subject"]);

		expect(result.result).toEqual({
			isHere: true,
			value: "8080",
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("throws when required value looks like another option", () => {
		const option = ServerCommand.initOption("port", (params) => params, { hasValue: true });

		expect(() => option.execute(["--port", "--other"])).toThrowError(ServerCommand.CommandOptionValueLooksLikeOptionError);
	});

	it("keeps undefined when no value is provided to a value option", () => {
		const option = ServerCommand.initOption("port", (params) => params, { hasValue: true });

		const result = option.execute(["--port"]);

		expect(result.result).toEqual({
			isHere: true,
			value: undefined,
		});
		expect(result.argumentRest).toEqual([]);
	});

	it("throws when value is provided to an option without value", () => {
		const option = ServerCommand.initOption("verbose", (params) => params);

		expect(() => option.execute(["--verbose=true"])).toThrowError(ServerCommand.CommandOptionValueNotRequiredError);
	});

	it("works when execute is called from pipe", () => {
		const option = ServerCommand.initOption("verbose", ({ isHere }) => isHere);

		const result = pipe(["--verbose"], option.execute);

		type _CheckResult = ExpectType<
			typeof result.result,
			boolean,
			"strict"
		>;

		expect(result.result).toBe(true);
	});
});
