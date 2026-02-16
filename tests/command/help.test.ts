import { DP } from "@duplojs/utils";
import { Command } from "@scripts";

describe("logHelp", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("renders name, description, and options blocks", () => {
		const renderSpy = vi.spyOn(Command.Printer, "render").mockImplementation(() => undefined);
		const command = Command.create(
			"root",
			{
				description: "Root command description",
				options: [
					Command.createBooleanOption(
						"silent",
						{
							aliases: ["s"],
						},
					),
					Command.createBooleanOption(
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

		Command.logHelp(command, 1);

		expect(renderSpy).toHaveBeenCalledTimes(3);
		expect(renderSpy.mock.calls[0]![0]).toEqual([
			Command.Printer.indent(1),
			Command.Printer.colorized("NAME:", "GREEN"),
			"root",
		]);
		expect(renderSpy.mock.calls[1]![0]).toContain("Root command description");
		expect(renderSpy.mock.calls[2]![0]).toContain(Command.Printer.colorized("OPTIONS:", "BLUE"));
		expect(renderSpy.mock.calls[2]![0]).toContain("Enable verbose mode");
	});

	it("recursively renders child commands when subject is a command list", () => {
		const renderSpy = vi.spyOn(Command.Printer, "render").mockImplementation(() => undefined);

		const child = Command.create(
			"child",
			() => Promise.resolve(undefined),
		);
		const root = Command.create(
			"root",
			{
				subject: [child],
			},
			() => Promise.resolve(undefined),
		);

		Command.logHelp(root);

		const renderedNames = renderSpy.mock.calls.map((call) => call[0]).flat();

		expect(renderedNames).toContain("root");
		expect(renderedNames).toContain("child");
	});

	it("formats supported subject data parser kinds", () => {
		const renderSpy = vi.spyOn(Command.Printer, "render").mockImplementation(() => undefined);
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
				subject: DP.tuple([DP.string(), DP.number()]) as never,
				expected: "[string, number]",
			},
			{
				subject: DP.tuple([DP.string()], { rest: DP.number() }) as never,
				expected: "[string, ...number[]]",
			},
			{
				subject: DP.tuple([DP.literal("")], { rest: DP.number() }) as never,
				expected: "[...number[]]",
			},
			{
				subject: DP.unknown(),
				expected: "<unknown>",
			},
		];

		for (const testCase of cases) {
			renderSpy.mockClear();
			const command = Command.create(
				"root",
				{
					subject: testCase.subject as never,
				},
				() => Promise.resolve(undefined),
			);

			Command.logHelp(command);

			const subjectCall = renderSpy.mock.calls.find(
				(call) => call[0].includes(Command.Printer.colorized("SUBJECT:", "MAGENTA")),
			);

			expect(subjectCall).toBeDefined();
			expect(subjectCall![0]).toContain(testCase.expected);
		}
	});
});
