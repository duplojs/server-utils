import { C, DP, DPE, E, type ExpectType, pipe, unwrap } from "@duplojs/utils";
import { DServerCommand, DServerDataParser, type DServerFile, TESTImplementation, setEnvironment } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("create", () => {
	afterEach(() => {
		setEnvironment("NODE");
		TESTImplementation.clear();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("creates a command node without params", () => {
		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		type _CheckCommand = ExpectType<
			typeof command,
			DServerCommand.Command,
			"strict"
		>;
		type _CheckName = ExpectType<
			typeof command.name,
			string,
			"strict"
		>;

		expect(command.name).toBe("root");
		expect(command.description).toBeNull();
		expect(command.options).toEqual([]);
		expect(command.children).toBeNull();
	});

	it("does not expose execute params when no option and no subject are declared", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				description: "root command",
			},
			(params) => {
				type _CheckParams = ExpectType<
					typeof params,
					{},
					"strict"
				>;

				executeSpy(params);
			},
		);

		await command.execute([], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith({ options: {} });
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("does not expose options when an empty options array is declared", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [],
			},
			(params) => {
				type _CheckParams = ExpectType<
					typeof params,
					{},
					"strict"
				>;

				executeSpy(params);
			},
		);

		await command.execute([], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith({ options: {} });
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("infers options only when at least one option is declared", async() => {
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
					DServerCommand.createArrayOption("ids", DP.number(), { min: 1 }),
				],
			},
			({ options }) => {
				type _CheckOptions = ExpectType<
					typeof options,
					{
						verbose: boolean;
						name: string;
						ids: [number, ...number[]] | undefined;
					},
					"strict"
				>;

				executeSpy(options);
			},
		);

		await command.execute(["-v", "--name=duplo", "--ids=1,2"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith({
			verbose: true,
			name: "duplo",
			ids: [1, 2],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("infers a single data parser subject without options", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.number(),
			},
			(params) => {
				type _CheckParams = ExpectType<
					typeof params,
					{
						subject: number;
					},
					"strict"
				>;

				executeSpy(params.subject);
			},
		);

		await command.execute(["42"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("infers options and subject together", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [DServerCommand.createBooleanOption("force")],
				subject: DPE.string(),
			},
			(params) => {
				type _CheckOptions = ExpectType<
					typeof params.options,
					{
						force: boolean;
					},
					"strict"
				>;
				type _CheckSubject = ExpectType<
					typeof params.subject,
					string,
					"strict"
				>;

				executeSpy(params);
			},
		);

		await command.execute(["--force", "target"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith({
			options: {
				force: true,
			},
			subject: "target",
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses tuple data parser subject from remaining arguments", async() => {
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

		await command.execute(["head", "1", "2"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(["head", 1, 2]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses array data parser subject from all remaining arguments", async() => {
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

		await command.execute(["1", "2"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith([1, 2]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses an empty array subject when no remaining argument exists", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.array(DP.string()),
			},
			({ subject }) => executeSpy(subject),
		);

		await command.execute([], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith([]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("coerces primitive data parser subjects without mutating the original parser", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		const subject = DP.number();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject,
			},
			({ subject }) => executeSpy(subject),
		);

		await command.execute(["42"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(subject.definition.coerce).toBe(false);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean primitive subject and infers the wrapped type", async() => {
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

		await command.execute(["42"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean new type subject and infers the new type", async() => {
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

		await command.execute(["42"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean entity property subject and infers literal unions", async() => {
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

		await command.execute(["admin"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith("admin");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses clean array subject and infers minimum tuple output", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: C.entityPropertyDefinitionTools.array(
					C.entityPropertyDefinitionTools.identifier("admin"),
					{ min: 1 },
				),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					readonly ["admin", ..."admin"[]],
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["admin"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(["admin"]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses tuple subject mixing clean types and data parsers", async() => {
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
				subject: [C.Number, DPE.string(), UserId],
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					[C.Number, string, C.GetNewType<typeof UserId>],
					"strict"
				>;

				executeSpy([
					unwrap(subject[0]),
					subject[1],
					unwrap(subject[2]),
				]);
			},
		);

		await command.execute(["42", "duplo", "7"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith([42, "duplo", 7]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("parses asynchronous file subject", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);
		TESTImplementation.set("stat", vi.fn().mockResolvedValue(E.success({
			isFile: true,
			sizeBytes: 1,
		} as never)));

		const command = DServerCommand.create(
			"root",
			{
				subject: DServerDataParser.file({ checkExist: true }),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					DServerFile.FileInterface,
					"strict"
				>;

				executeSpy(subject.path);
			},
		);

		await command.execute(["/tmp/demo.txt"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith("/tmp/demo.txt");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports pipe compatibility", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = pipe(
			"root",
			(name) => DServerCommand.create(
				name,
				{
					subject: DP.number(),
				},
				({ subject }) => executeSpy(subject),
			),
		);

		await command.execute(["42"], createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("creates command children from a command subject", () => {
		const child = DServerCommand.create(
			"child",
			() => undefined,
		);
		const command = DServerCommand.create(
			"root",
			{
				subject: child,
			},
			() => undefined,
		);

		expect(command.children).toMatchObject({
			type: "subCommand",
			subCommands: [child],
		});
	});

	it("creates subject children from a parser subject", () => {
		const subject = DPE.string();
		const command = DServerCommand.create(
			"root",
			{
				subject,
			},
			() => undefined,
		);

		expect(command.children).toMatchObject({
			type: "subject",
			subject,
		});
	});

	it("dispatches to matching command subject", async() => {
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
				subject: child,
			},
			rootExecuteSpy,
		);

		await root.execute(["child"], createError("root"));

		expect(childExecuteSpy).toHaveBeenCalledWith({ options: {} });
		expect(rootExecuteSpy).not.toHaveBeenCalled();
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("returns command error when no command subject matches", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const error = createError("root");
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

		await expect(root.execute(["unknown"], error)).resolves.toBe(SymbolCommandError);

		expect(childExecuteSpy).not.toHaveBeenCalled();
		expect(rootExecuteSpy).not.toHaveBeenCalled();
		expect(error.issues[0]).toMatchObject({
			type: "command",
			expected: "existing child command",
			received: "unknown",
			commandPath: ["root"],
		});
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("returns command error when command without subject receives an unknown argument", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const error = createError("root");
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		await expect(command.execute(["unknown"], error)).resolves.toBe(SymbolCommandError);

		expect(error.issues[0]).toMatchObject({
			type: "command",
			expected: "existing child command",
			received: "unknown",
			commandPath: ["root"],
		});
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("returns command error when a single subject receives many arguments", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const error = createError("root");
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DPE.string(),
			},
			() => undefined,
		);

		await expect(command.execute(["one", "two"], error)).resolves.toBe(SymbolCommandError);

		expect(error.issues[0]).toMatchObject({
			type: "command",
			expected: "exactly one subject argument",
			received: ["one", "two"],
			commandPath: ["root"],
		});
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("returns subject error when subject parsing fails", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const error = createError("root");
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.number(),
			},
			() => undefined,
		);

		await expect(command.execute(["bad"], error)).resolves.toBe(SymbolCommandError);

		expect(error.issues[0]).toMatchObject({
			type: "subject",
			commandPath: ["root"],
		});
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("returns command error when help option is malformed", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const error = createError("root");
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		await expect(command.execute(["--help=true"], error)).resolves.toBe(SymbolCommandError);

		expect(error.issues[0]).toMatchObject({
			type: "option",
			target: "help",
			commandPath: ["root"],
		});
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("renders help and exits without executing the command when help option is present", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				description: "Root command",
				options: [DServerCommand.createBooleanOption("verbose")],
				subject: DPE.string(),
			},
			executeSpy,
		);

		await command.execute(["--help"], createError("root"));

		expect(executeSpy).not.toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledTimes(1);
		expect(logSpy.mock.calls[0]?.[0]).toContain("NAME:");
		expect(logSpy.mock.calls[0]?.[0]).toContain("root");
		expect(logSpy.mock.calls[0]?.[0]).toContain("Root command");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("stops option parsing after a first option error", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const laterOptionSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				options: [
					DServerCommand.createOption("enabled", DP.boolean() as never),
					DServerCommand.initOption("later", () => {
						laterOptionSpy();

						return true;
					}),
				],
			},
			() => undefined,
		);

		await expect(command.execute(["--enabled=yes"], createError("root"))).resolves.toBe(SymbolCommandError);

		expect(laterOptionSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalled();
	});

	it("does not capture user execution errors", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const userError = new Error("user crash");
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			() => {
				throw userError;
			},
		);

		await expect(command.execute([], createError("root"))).rejects.toThrow(userError);
		expect(exitSpy).not.toHaveBeenCalled();
	});
});
