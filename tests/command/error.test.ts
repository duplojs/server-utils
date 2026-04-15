import { type ExpectType, DP, E, unwrap } from "@duplojs/utils";
import { addDataParserError, addIssue, createError, interpretError, popErrorPath, setErrorPath, SymbolCommandError } from "@scripts/command/error";

describe("error", () => {
	it("creates and mutates a command error path", () => {
		const error = createError("root");

		type _CheckError = ExpectType<
			typeof error.currentCommandPath,
			string[],
			"strict"
		>;

		expect(error.currentCommandPath).toEqual(["root"]);
		expect(setErrorPath(error, "child", 1)).toBe(error);
		expect(error.currentCommandPath).toEqual(["root", "child"]);
		expect(popErrorPath(error)).toBe(error);
		expect(error.currentCommandPath).toEqual(["root"]);
	});

	it("adds command issues and renders command context", () => {
		const error = createError("root");

		expect(
			addIssue(
				error,
				{
					type: "command",
					expected: "exactly one subject argument",
					received: ["one", "two"],
					message: "Expected exactly one subject argument, received 2.",
				},
			),
		).toBe(SymbolCommandError);

		expect(error.issues).toEqual([
			{
				type: "command",
				commandPath: ["root"],
				expected: "exactly one subject argument",
				received: ["one", "two"],
				message: "Expected exactly one subject argument, received 2.",
			},
		]);
		expect(interpretError(error)).toContain("Expected exactly one subject argument, received 2.");
	});

	it("adds data parser issues and renders option and subject contexts", () => {
		const error = createError("root");
		const optionResult = DP.boolean().parse("yes");

		expect(E.isLeft(optionResult)).toBe(true);
		if (!E.isLeft(optionResult)) {
			return;
		}

		expect(
			addDataParserError(
				error,
				unwrap(optionResult),
				{
					type: "option",
					target: "enabled",
				},
			),
		).toBe(SymbolCommandError);

		setErrorPath(error, "child", 1);

		const subjectResult = DP.tuple([DP.string(), DP.number()]).parse(["name", "bad"]);

		expect(E.isLeft(subjectResult)).toBe(true);
		if (!E.isLeft(subjectResult)) {
			return;
		}

		expect(
			addDataParserError(
				error,
				unwrap(subjectResult),
				{
					type: "subject",
				},
			),
		).toBe(SymbolCommandError);

		const output = interpretError(error);

		expect(output).toContain("COMMAND:");
		expect(output).toContain("root");
		expect(output).toContain("OPTION:");
		expect(output).toContain("--enabled");
		expect(output).toContain("SUBJECT:");
		expect(output).toContain("expected");
		expect(output).toContain("boolean");
		expect(error.issues[0]?.target).toBe("enabled");
		expect(error.issues[1]?.commandPath).toEqual(["root", "child"]);
		expect(error.issues[1]?.parserPath).toBe("[1]");
	});

	it("renders fallback text when no issue exists", () => {
		expect(interpretError(createError("root"))).toContain("No issue found");
	});
});
