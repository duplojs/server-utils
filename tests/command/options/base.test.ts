import { type ExpectType, pipe } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("initOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("creates an option with default metadata", () => {
		const option = DServerCommand.initOption("verbose", ({ isHere }) => isHere);

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
		const option = DServerCommand.initOption("verbose", (params) => params);
		const result = option.execute(["--other"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual({
			isHere: false,
			value: undefined,
		});
		expect(result.argumentRest).toEqual(["--other"]);
	});

	it("detects option by alias and removes the flag from args", () => {
		const option = DServerCommand.initOption("verbose", (params) => params, { aliases: ["v"] });
		const result = option.execute(["-v", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual({
			isHere: true,
			value: undefined,
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("extracts inline value when option requires a value", () => {
		const option = DServerCommand.initOption("port", (params) => params, { hasValue: true });
		const result = option.execute(["--port=8080", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual({
			isHere: true,
			value: "8080",
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("extracts next argument when option requires a value", () => {
		const option = DServerCommand.initOption("port", (params) => params, { hasValue: true });
		const result = option.execute(["--port", "8080", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual({
			isHere: true,
			value: "8080",
		});
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when required value looks like another option", () => {
		const option = DServerCommand.initOption("port", (params) => params, { hasValue: true });
		const error = createError("root");

		expect(option.execute(["--port", "--other"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("value for option --port");
	});

	it("keeps undefined when no value is provided to a value option", () => {
		const option = DServerCommand.initOption("port", (params) => params, { hasValue: true });
		const result = option.execute(["--port"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual({
			isHere: true,
			value: undefined,
		});
		expect(result.argumentRest).toEqual([]);
	});

	it("returns command error when value is provided to an option without value", () => {
		const option = DServerCommand.initOption("verbose", (params) => params);
		const error = createError("root");

		expect(option.execute(["--verbose=true"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("option without value --verbose");
	});

	it("returns command error when execute fails on a present option without value", () => {
		const option = DServerCommand.initOption(
			"verbose",
			() => SymbolCommandError,
		);

		expect(option.execute(["--verbose"], createError("root"))).toBe(SymbolCommandError);
	});

	it("works when execute is called from pipe", () => {
		const option = DServerCommand.initOption("verbose", ({ isHere }) => isHere);
		const result = pipe(["--verbose"], (args) => option.execute(args, createError("root")));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			boolean,
			"strict"
		>;

		expect(result.result).toBe(true);
	});
});
