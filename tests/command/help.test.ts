import { type ExpectType, DP, Printer } from "@duplojs/utils";
import { DServerCommand } from "@scripts";

describe("help", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("renders name, description, options and subject blocks", () => {
		const command = DServerCommand.create(
			"root",
			{
				description: "Root command description",
				options: [
					DServerCommand.createBooleanOption(
						"silent",
						{
							aliases: ["s"],
						},
					),
					DServerCommand.createBooleanOption(
						"verbose",
						{
							description: "Enable verbose mode",
							aliases: ["v"],
						},
					),
				],
				subject: DP.string(),
			},
			() => Promise.resolve(undefined),
		);

		const lines = DServerCommand.renderCommandHelp(command, 1);

		type _CheckLines = ExpectType<
			typeof lines,
			string[],
			"strict"
		>;

		expect(lines).toContain(
			`${Printer.indent(1)}${Printer.colorizedBold("NAME:", "green")}root`,
		);
		expect(lines.join("\n")).toContain("Root command description");
		expect(lines.join("\n")).toContain(Printer.colorizedBold("OPTIONS:", "blue"));
		expect(lines.join("\n")).toContain("--silent");
		expect(lines.join("\n")).toContain("Enable verbose mode");
		expect(lines).toContain(
			`${Printer.indent(2)}${Printer.colorizedBold("SUBJECT:", "magenta")}<string>`,
		);
	});

	it("logs rendered help lines", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
		const command = DServerCommand.create(
			"root",
			() => Promise.resolve(undefined),
		);

		DServerCommand.logCommandHelp(command, 1);

		expect(logSpy).toHaveBeenCalledTimes(1);
		expect(logSpy.mock.calls[0]).toEqual([
			Printer.renderParagraph(
				DServerCommand.renderCommandHelp(command, 1),
			),
		]);
	});

	it("renders execOption help with a dedicated title and options block", () => {
		const lines = DServerCommand.renderExecOptionHelp(
			[
				DServerCommand.createBooleanOption("help", { aliases: ["h"] }),
				DServerCommand.createBooleanOption("verbose", {
					aliases: ["v"],
					description: "Enable verbose mode",
				}),
			],
			1,
		);

		expect(lines).toContain(
			`${Printer.indent(1)}${Printer.colorizedBold("OPTION HELP", "green")}`,
		);
		expect(lines.join("\n")).toContain(Printer.colorizedBold("OPTIONS:", "blue"));
		expect(lines.join("\n")).toContain("--help");
		expect(lines.join("\n")).toContain("--verbose");
		expect(lines.join("\n")).toContain("Enable verbose mode");
	});

	it("logs execOption help lines", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
		const options = [DServerCommand.createBooleanOption("help", { aliases: ["h"] })];

		DServerCommand.logExecOptionHelp(options, 1);

		expect(logSpy).toHaveBeenCalledTimes(1);
		expect(logSpy.mock.calls[0]).toEqual([
			Printer.renderParagraph(
				DServerCommand.renderExecOptionHelp(options, 1),
			),
		]);
	});

	it("recursively renders child commands when subject is a command list", () => {
		const child = DServerCommand.create(
			"child",
			() => Promise.resolve(undefined),
		);
		const root = DServerCommand.create(
			"root",
			{
				subject: [child],
			},
			() => Promise.resolve(undefined),
		);

		const lines = DServerCommand.renderCommandHelp(root, 0);
		const output = lines.join("\n");

		expect(output).toContain("root");
		expect(output).toContain("child");
	});

	it("renders tuple subjects without angle brackets", () => {
		const command = DServerCommand.create(
			"root",
			{
				subject: DP.tuple([DP.string(), DP.coerce.number()]),
			},
			() => Promise.resolve(undefined),
		);

		expect(DServerCommand.renderCommandHelp(command, 0)).toContain(
			`${Printer.indent(1)}${Printer.colorizedBold("SUBJECT:", "magenta")}[string, number]`,
		);
	});

	it("formats supported subject data parser kinds", () => {
		const cases = [
			{
				subject: DP.string(),
				expected: "string",
			},
			{
				subject: DP.number(),
				expected: "number",
			},
			{
				subject: DP.bigint(),
				expected: "bigint",
			},
			{
				subject: DP.date(),
				expected: "date",
			},
			{
				subject: DP.time(),
				expected: "time",
			},
			{
				subject: DP.nil(),
				expected: "null",
			},
			{
				subject: DP.literal(["on", "off"] as const),
				expected: "on | off",
			},
			{
				subject: DP.templateLiteral(["id-", DP.number()]),
				expected: "id-${number}",
			},
			{
				subject: DP.union([DP.string(), DP.number()]),
				expected: "string | number",
			},
			{
				subject: DP.array(DP.string()),
				expected: "string[]",
			},
			{
				subject: DP.tuple([DP.string(), DP.number()]),
				expected: "[string, number]",
			},
			{
				subject: DP.tuple([DP.string()], { rest: DP.number() }),
				expected: "[string, ...number[]]",
			},
			{
				subject: DP.tuple([DP.literal("")], { rest: DP.number() }),
				expected: "[...number[]]",
			},
			{
				subject: DP.unknown(),
				expected: "unknown",
			},
		];

		for (const testCase of cases) {
			expect(DServerCommand.formatSubject(testCase.subject)).toBe(testCase.expected);
		}
	});
});
