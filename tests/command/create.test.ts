import { type ExpectType, DPE, DP, S } from "@duplojs/utils";
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

	it("throws CommandManyArgumentsError when data parser subject receives many arguments", async() => {
		setEnvironment("TEST");
		TESTImplementation.set("exitProcess", vi.fn());

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

		await expect(command.execute(["one", "two"])).rejects.toThrowError(DServerCommand.CommandManyArgumentsError);
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

	it("executes matching child command when subject is a command list", async() => {
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

		expect(childExecuteSpy).toHaveBeenCalledWith({ options: {} });
		expect(rootExecuteSpy).not.toHaveBeenCalled();
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("does not execute child command when no child name matches", async() => {
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

		await root.execute(["unknown", "arg"]);

		expect(childExecuteSpy).not.toHaveBeenCalled();
		expect(rootExecuteSpy).toHaveBeenCalledWith({});
		expect(exitSpy).toHaveBeenCalledWith(0);
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
});
