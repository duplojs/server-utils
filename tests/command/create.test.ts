import { type ExpectType, C, DPE, DP, S, unwrap } from "@duplojs/utils";
import { DServerCommand, TESTImplementation, setEnvironment } from "@scripts";

describe("create", () => {
	afterEach(() => {
		setEnvironment("NODE");
		TESTImplementation.clear();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("creates a command with default params", () => {
		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		type _CheckName = ExpectType<
			typeof command.name,
			string,
			"strict"
		>;
		type _CheckDescription = ExpectType<
			typeof command.description,
			string | null,
			"strict"
		>;
		type _CheckSubject = ExpectType<
			typeof command.subject,
			DServerCommand.Subject | null | readonly DServerCommand.Command[],
			"strict"
		>;

		expect(command.name).toBe("root");
		expect(command.description).toBeNull();
		expect(command.options).toEqual([]);
		expect(command.subject).toBeNull();
	});

	it("executes command without params and exits with code 0", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			executeSpy,
		);

		await command.execute([]);

		expect(executeSpy).toHaveBeenCalledWith({ options: {} });
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses options and subject when executing a tuple subject command", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [
					DServerCommand.createBooleanOption("verbose", { aliases: ["v"] }),
					DServerCommand.createOption("name", DPE.string(), { required: true }),
				],
				subject: DP.tuple([DP.string()]),
			},
			(params) => {
				type _CheckOptions = ExpectType<
					typeof params.options,
					{
						verbose: boolean;
						name: string;
					},
					"strict"
				>;
				type _CheckSubject = ExpectType<
					typeof params.subject,
					[string],
					"strict"
				>;

				return executeSpy(params);
			},
		);

		await command.execute(["--verbose", "--name=duplo", "subject"]);

		expect(executeSpy).toHaveBeenCalledWith({
			options: {
				verbose: true,
				name: "duplo",
			},
			subject: ["subject"],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("renders command error when data parser subject receives many arguments", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DPE.string().optional(),
			},
			({ subject }) => {
				type check = ExpectType<
					typeof subject,
					string | undefined,
					"strict"
				>;

				return undefined;
			},
		);

		await command.execute(["one", "two"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("Command failed");
		expect(errorSpy.mock.calls[0]![0]).toContain("subject");
		expect(errorSpy.mock.calls[0]![0]).toContain("Expected exactly one subject argument, received 2.");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("runs help flow when help option is provided", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			executeSpy,
		);

		await command.execute(["--help"]);

		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("renders command error when help option is malformed", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		await command.execute(["--help=true"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("option without value --help");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("does not print root error when malformed help is executed with a shared error", async() => {
		setEnvironment("TEST");
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		await expect(command.execute(["--help=true"], DServerCommand.createError("parent"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
	});

	it("executes data parser subject branch with a single argument", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [
					{
						name: "shape-rest-arg",
						description: null,
						aliases: [],
						hasValue: false,
						execute: () => ({
							result: true,
							argumentRest: "a",
						}),
					} as never,
				],
				subject: DPE.string(),
			},
			({ options, subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					string,
					"strict"
				>;

				executeSpy({
					options,
					subject,
				});
			},
		);

		await command.execute(["subject"]);

		expect(executeSpy).toHaveBeenCalledWith({
			options: {
				"shape-rest-arg": true,
			},
			subject: "a",
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("coerces primitive data parser subject from a single cli argument", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.number(),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					number,
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["42"]);

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("renders command error when tuple subject parsing fails", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.tuple([DP.number()]),
			},
			() => undefined,
		);

		await command.execute(["bad"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("SUBJECT:");
		expect(errorSpy.mock.calls[0]![0]).toContain("number");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("renders command error when single subject parsing fails", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.number(),
			},
			() => undefined,
		);

		await command.execute(["bad"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("expected");
		expect(errorSpy.mock.calls[0]![0]).toContain("number");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("does not print subject errors when a shared error is provided", async() => {
		setEnvironment("TEST");
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const tupleCommand = DServerCommand.create(
			"root",
			{
				subject: DP.tuple([DP.number()]),
			},
			() => undefined,
		);
		const singleParseCommand = DServerCommand.create(
			"root",
			{
				subject: DP.number(),
			},
			() => undefined,
		);
		const manyArgsCommand = DServerCommand.create(
			"root",
			{
				subject: DP.string(),
			},
			() => undefined,
		);

		await expect(tupleCommand.execute(["bad"], DServerCommand.createError("parent"))).resolves.toBe(DServerCommand.SymbolCommandError);
		await expect(singleParseCommand.execute(["bad"], DServerCommand.createError("parent"))).resolves.toBe(DServerCommand.SymbolCommandError);
		await expect(manyArgsCommand.execute(["one", "two"], DServerCommand.createError("parent"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
	});

	it("infers typed params with array subject", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DPE.string().array(),
			},
			(params) => {
				type _CheckSubject = ExpectType<
					typeof params.subject,
					string[],
					"strict"
				>;

				executeSpy(params);
			},
		);

		await command.execute(["one", "two"]);

		expect(executeSpy).toHaveBeenCalledWith({
			options: {},
			subject: ["one", "two"],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("coerces primitive data parser inside tuple subject", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.tuple([DP.number()]),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					[number],
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["42"]);

		expect(executeSpy).toHaveBeenCalledWith([42]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("coerces primitive data parser inside tuple rest subject", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.tuple([DP.string()], { rest: DP.number() }),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					[string, ...number[]],
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["head", "1", "2"]);

		expect(executeSpy).toHaveBeenCalledWith(["head", 1, 2]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("coerces primitive data parser inside array subject", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.array(DP.number()),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					number[],
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["1", "2"]);

		expect(executeSpy).toHaveBeenCalledWith([1, 2]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean primitive subject and infers wrapped subject type", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: C.Number,
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					C.Number,
					"strict"
				>;

				executeSpy(unwrap(subject));
			},
		);

		await command.execute(["42"]);

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean new type subject and infers required subject type", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);
		const UserId = C.createNewType(
			"userId",
			DP.number(),
		);

		const command = DServerCommand.create(
			"root",
			{
				subject: UserId,
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					C.GetNewType<typeof UserId>,
					"strict"
				>;

				executeSpy(unwrap(subject));
			},
		);

		await command.execute(["42"]);

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean entity property subject and infers literal union type", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: C.entityPropertyDefinitionTools.union(
					C.entityPropertyDefinitionTools.identifier("admin"),
					C.entityPropertyDefinitionTools.identifier("client"),
				),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					"admin" | "client",
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["admin"]);

		expect(executeSpy).toHaveBeenCalledWith("admin");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("executes optional option with pipe and transform parser without runtime bug", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [
					DServerCommand.createOption(
						"name",
						DPE.string().pipe(
							DPE.transform(
								DPE.string(),
								S.toUpperCase,
							),
						),
					),
				],
			},
			({ options }) => {
				type _CheckOptions = ExpectType<
					typeof options.name,
					Uppercase<string> | undefined,
					"strict"
				>;

				executeSpy({ options });
			},
		);

		await command.execute([]);
		await command.execute(["--name=guest"]);

		expect(executeSpy).toHaveBeenNthCalledWith(1, {
			options: {
				name: undefined,
			},
		});
		expect(executeSpy).toHaveBeenNthCalledWith(2, {
			options: {
				name: "GUEST",
			},
		});
		expect(exitSpy).toHaveBeenNthCalledWith(1, 0);
		expect(exitSpy).toHaveBeenNthCalledWith(2, 0);
	});

	it("renders command error when option value parsing fails", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [DServerCommand.createOption("enabled", DP.boolean() as never)],
			},
			() => undefined,
		);

		await command.execute(["--enabled=yes"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("Command failed");
		expect(errorSpy.mock.calls[0]![0]).toContain("OPTION:");
		expect(errorSpy.mock.calls[0]![0]).toContain("--enabled");
		expect(errorSpy.mock.calls[0]![0]).toContain("expected");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("stops option reduction after a first option error", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const secondOptionSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [
					DServerCommand.createOption("enabled", DP.boolean() as never),
					DServerCommand.initOption("later", () => {
						secondOptionSpy();

						return true;
					}),
				],
			},
			() => undefined,
		);

		await command.execute(["--enabled=yes"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(secondOptionSpy).not.toHaveBeenCalled();
		expect(exitSpy).toHaveBeenCalledWith(1);
	});

	it("does not capture user command execution errors", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);
		const userError = new Error("user crash");

		const command = DServerCommand.create(
			"root",
			() => {
				throw userError;
			},
		);

		await expect(command.execute([])).rejects.toThrow(userError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
	});

	it("handles child command dispatch and fallback", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const childExecuteSpy = vi.fn();
		const rootExecuteSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const child = DServerCommand.create(
			"child",
			childExecuteSpy,
		);
		const root = DServerCommand.create(
			"root",
			{
				subject: [child],
			},
			rootExecuteSpy,
		);

		await root.execute(["child", "arg"]);
		await root.execute(["unknown", "arg"]);

		expect(childExecuteSpy).toHaveBeenCalledWith({ options: {} });
		expect(rootExecuteSpy).toHaveBeenCalledWith({});
		expect(exitSpy).toHaveBeenNthCalledWith(1, 0);
		expect(exitSpy).toHaveBeenNthCalledWith(2, 0);
	});

	it("runs help only on matching child command", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
		const child = DServerCommand.create(
			"child",
			() => undefined,
		);
		const root = DServerCommand.create(
			"root",
			{
				subject: [child],
			},
			() => undefined,
		);
		TESTImplementation.set("exitProcess", exitSpy);

		await root.execute(["child", "--help"]);

		const renderedHelp = consoleLogSpy.mock.calls.flat().join(" ");

		expect(renderedHelp).toContain("child");
		expect(renderedHelp).not.toContain("root");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("renders root command error when a child command fails", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const child = DServerCommand.create(
			"child",
			{
				options: [DServerCommand.createOption("enabled", DP.boolean() as never)],
			},
			() => undefined,
		);
		const root = DServerCommand.create(
			"root",
			{
				subject: [child],
			},
			() => undefined,
		);

		await root.execute(["child", "--enabled=yes"]);

		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0]![0]).toContain("COMMAND:");
		expect(errorSpy.mock.calls[0]![0]).toContain("root child");
		expect(exitSpy).toHaveBeenCalledWith(1);
	});
});
