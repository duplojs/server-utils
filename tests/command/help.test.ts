import { DP, Printer } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { render } from "@scripts/command/help";

describe("logHelp", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("renders name, description, and options blocks", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
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
			},
			() => Promise.resolve(undefined),
		);

		DServerCommand.logHelp(command, 1);

		expect(logSpy).toHaveBeenCalledTimes(1);

		const output = logSpy.mock.calls[0]![0] as string;

		expect(output).toContain(
			render(
				[
					`${Printer.indent(1)}${Printer.colorizedBold("NAME:", "green")}`,
					"root",
				],
			),
		);
		expect(output).toContain("Root command description");
		expect(output).toContain(Printer.colorizedBold("OPTIONS:", "blue"));
		expect(output).toContain("--silent");
		expect(output).toContain("Enable verbose mode");
	});

	it("recursively renders child commands when subject is a command list", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

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

		DServerCommand.logHelp(root);

		expect(logSpy).toHaveBeenCalledTimes(1);

		const output = logSpy.mock.calls[0]![0] as string;

		expect(output).toContain("root");
		expect(output).toContain("child");
	});

	it("formats supported subject data parser kinds", () => {
		const cases = [
			{
				subject: DP.string(),
				expected: "<string>",
			},
			{
				subject: DP.number(),
				expected: "<number>",
			},
			{
				subject: DP.bigint(),
				expected: "<bigint>",
			},
			{
				subject: DP.date(),
				expected: "<date>",
			},
			{
				subject: DP.time(),
				expected: "<time>",
			},
			{
				subject: DP.nil(),
				expected: "<null>",
			},
			{
				subject: DP.literal(["on", "off"] as const),
				expected: "<on | off>",
			},
			{
				subject: DP.templateLiteral(["id-", DP.number()]),
				expected: "<id-${number}>",
			},
			{
				subject: DP.union([DP.string(), DP.number()]),
				expected: "<string | number>",
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
				expected: "<unknown>",
			},
		];

		for (const testCase of cases) {
			const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
			const command = DServerCommand.create(
				"root",
				{
					subject: testCase.subject as never,
				},
				() => Promise.resolve(undefined),
			);

			DServerCommand.logHelp(command);

			expect(logSpy).toHaveBeenCalledTimes(1);

			const output = logSpy.mock.calls[0]![0] as string;

			expect(output).toContain(
				render(
					[
						`${Printer.indent(1)}${Printer.colorizedBold("SUBJECT:", "magenta")}`,
						testCase.expected,
					],
				),
			);

			logSpy.mockRestore();
		}
	});
});
