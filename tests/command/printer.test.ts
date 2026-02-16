import { DP, type ExpectType, pipe } from "@duplojs/utils";
import { Command } from "@scripts";

describe("Printer", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("colorized returns ANSI wrapped text with lowercase color", () => {
		const result = Command.Printer.colorized("hello", "red");

		type _CheckResult = ExpectType<
			typeof result,
			string,
			"strict"
		>;

		expect(result).toBe("\x1b[31mhello\x1b[0m");
	});

	it("colorized returns bold ANSI wrapped text with uppercase color", () => {
		const result = Command.Printer.colorized("hello", "RED");

		expect(result).toBe("\x1b[1m\x1b[31mhello\x1b[0m\x1b[0m");
	});

	it("indent repeats tab based on level", () => {
		const result = Command.Printer.indent(3);

		expect(result).toBe("\t\t\t");
	});

	it("parenthesize wraps text with parentheses", () => {
		const result = Command.Printer.parenthesize("value");

		expect(result).toBe("(value)");
	});

	it("colorizedOption renders aliases and full option name", () => {
		const option = Command.createOption("verbose", DP.string(), { aliases: ["v", "V"] });

		const result = Command.Printer.colorizedOption(option, "green");

		expect(result).toBe("\x1b[32m-v, -V, --verbose\x1b[0m");
	});

	it("render prints all provided values", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

		Command.Printer.render(["one", "two"]);

		expect(logSpy).toHaveBeenCalledWith("one", "two");
	});

	it("works when parenthesize is called from pipe", () => {
		const result = pipe("pipe-value", Command.Printer.parenthesize);

		type _CheckResult = ExpectType<
			typeof result,
			string,
			"strict"
		>;

		expect(result).toBe("(pipe-value)");
	});
});
