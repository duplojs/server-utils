import { DP, type ExpectType, pipe } from "@duplojs/utils";
import { DServerCommand } from "@scripts";

describe("Printer", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("colorized returns ANSI wrapped text with lowercase color", () => {
		const result = DServerCommand.Printer.colorized("hello", "red");

		type _CheckResult = ExpectType<
			typeof result,
			string,
			"strict"
		>;

		expect(result).toBe("\x1b[31mhello\x1b[0m");
	});

	it("colorized returns bold ANSI wrapped text with uppercase color", () => {
		const result = DServerCommand.Printer.colorized("hello", "RED");

		expect(result).toBe("\x1b[1m\x1b[31mhello\x1b[0m\x1b[0m");
	});

	it("indent repeats tab based on level", () => {
		const result = DServerCommand.Printer.indent(3);

		expect(result).toBe("\t\t\t");
	});

	it("parenthesize wraps text with parentheses", () => {
		const result = DServerCommand.Printer.parenthesize("value");

		expect(result).toBe("(value)");
	});

	it("colorizedOption renders aliases and full option name", () => {
		const option = DServerCommand.createOption("verbose", DP.string(), { aliases: ["v", "V"] });

		const result = DServerCommand.Printer.colorizedOption(option, "green");

		expect(result).toBe("\x1b[32m-v, -V, --verbose\x1b[0m");
	});

	it("render prints all provided values", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

		DServerCommand.Printer.render(["one", "two"]);

		expect(logSpy).toHaveBeenCalledWith("one", "two");
	});

	it("works when parenthesize is called from pipe", () => {
		const result = pipe("pipe-value", DServerCommand.Printer.parenthesize);

		type _CheckResult = ExpectType<
			typeof result,
			string,
			"strict"
		>;

		expect(result).toBe("(pipe-value)");
	});
});
