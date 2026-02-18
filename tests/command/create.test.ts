import { type ExpectType, DP } from "@duplojs/utils";
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
					DServerCommand.createOption("name", DP.string(), { required: true }),
				],
				subject: DP.tuple([DP.string()]),
			},
			executeSpy,
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
				subject: DP.string(),
			},
			() => undefined,
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
				subject: DP.string(),
			},
			executeSpy,
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
