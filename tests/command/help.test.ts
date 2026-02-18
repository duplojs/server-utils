import { DP } from "@duplojs/utils";
import { DServerCommand } from "@scripts";

describe("logHelp", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("renders name, description, and options blocks", () => {
		const renderSpy = vi.spyOn(DServerCommand.Printer, "render").mockImplementation(() => undefined);
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

		expect(renderSpy).toHaveBeenCalledTimes(3);
		expect(renderSpy.mock.calls[0]![0]).toEqual([
			DServerCommand.Printer.indent(1),
			DServerCommand.Printer.colorized("NAME:", "GREEN"),
			"root",
		]);
		expect(renderSpy.mock.calls[1]![0]).toContain("Root command description");
		expect(renderSpy.mock.calls[2]![0]).toContain(DServerCommand.Printer.colorized("OPTIONS:", "BLUE"));
		expect(renderSpy.mock.calls[2]![0].join("")).toContain("Enable verbose mode");
	});

	it("recursively renders child commands when subject is a command list", () => {
		const renderSpy = vi.spyOn(DServerCommand.Printer, "render").mockImplementation(() => undefined);

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

		const renderedNames = renderSpy.mock.calls.map((call) => call[0]).flat();

		expect(renderedNames).toContain("root");
		expect(renderedNames).toContain("child");
	});

	it("formats supported subject data parser kinds", () => {
		const renderSpy = vi.spyOn(DServerCommand.Printer, "render").mockImplementation(() => undefined);
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
			renderSpy.mockClear();
			const command = DServerCommand.create(
				"root",
				{
					subject: testCase.subject as never,
				},
				() => Promise.resolve(undefined),
			);

			DServerCommand.logHelp(command);

			const subjectCall = renderSpy.mock.calls.find(
				(call) => call[0].includes(DServerCommand.Printer.colorized("SUBJECT:", "MAGENTA")),
			);

			expect(subjectCall).toBeDefined();
			expect(subjectCall![0]).toContain(testCase.expected);
		}
	});
});
