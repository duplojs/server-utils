import { type ExpectType, DP } from "@duplojs/utils";
import { Command, TESTImplementation, setEnvironment } from "@scripts";

describe("create", () => {
	afterEach(() => {
		setEnvironment("NODE");
		TESTImplementation.clear();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("creates a command with default params", () => {
		const command = Command.create(
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

		const command = Command.create(
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

		const command = Command.create(
			"root",
			{
				options: [
					Command.createBooleanOption("verbose", { aliases: ["v"] }),
					Command.createOption("name", DP.string(), { required: true }),
				],
				subject: DP.tuple([DP.string()]) as never,
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

		const command = Command.create(
			"root",
			{
				subject: DP.string(),
			},
			() => undefined,
		);

		await expect(command.execute(["one", "two"])).rejects.toThrowError(Command.CommandManyArgumentsError);
	});

	it("runs help flow when help option is provided", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = Command.create(
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

		const command = Command.create(
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

		const child = Command.create(
			"child",
			childExecuteSpy,
		);
		const root = Command.create(
			"root",
			{
				subject: [child],
			},
			rootExecuteSpy,
		);

		await root.execute(["child", "arg"]);

		expect(childExecuteSpy).toHaveBeenCalledWith({ options: {} });
		expect(rootExecuteSpy).toHaveBeenCalledWith({});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("does not execute child command when no child name matches", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const childExecuteSpy = vi.fn();
		const rootExecuteSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const child = Command.create(
			"child",
			childExecuteSpy,
		);
		const root = Command.create(
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
});
