import { E, type ExpectType, C, DPE, DP, S, unwrap, type AnyTuple } from "@duplojs/utils";
import { DServerCommand, DServerDataParser, DServerFile, TESTImplementation, setEnvironment } from "@scripts";

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
			DServerCommand.Subject | null | AnyTuple<DServerCommand.Command>,
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

		await command.execute([], DServerCommand.createError("root"));

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

		await command.execute(["--verbose", "--name=duplo", "subject"], DServerCommand.createError("root"));

		expect(executeSpy).toHaveBeenCalledWith({
			options: {
				verbose: true,
				name: "duplo",
			},
			subject: ["subject"],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("returns command error when data parser subject receives many arguments", async() => {
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

		await expect(command.execute(["one", "two"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
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

		await command.execute(["--help"], DServerCommand.createError("root"));

		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("returns command error when help option is malformed", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			() => undefined,
		);

		await expect(command.execute(["--help=true"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
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

		await command.execute(["subject"], DServerCommand.createError("root"));

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

		await command.execute(["42"], DServerCommand.createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(42);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports tuple subject with clean type contracts", async() => {
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
				subject: [C.Number, UserId],
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					[C.Number, C.GetNewType<typeof UserId>],
					"strict"
				>;

				executeSpy(subject.map(unwrap));
			},
		);

		await command.execute(["42", "7"], DServerCommand.createError("root"));

		expect(executeSpy).toHaveBeenCalledWith([42, 7]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports file data parser as subject with path coercion", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);
		const schema = DServerDataParser.file();

		const command = DServerCommand.create(
			"root",
			{
				subject: schema,
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					DServerFile.FileInterface,
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["/tmp/demo.txt"], DServerCommand.createError("root"));

		expect(DServerFile.isFileInterface(executeSpy.mock.calls[0]?.[0])).toBe(true);
		expect(executeSpy.mock.calls[0]?.[0].path).toBe("/tmp/demo.txt");
		expect(schema.definition.coerce).toBe(false);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports pipe subject with file output data parser", async() => {
		setEnvironment("TEST");
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("exitProcess", exitSpy);

		const command = DServerCommand.create(
			"root",
			{
				subject: DP.pipe(
					DP.string(),
					DServerDataParser.coerce.file(),
				),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					DServerFile.FileInterface,
					"strict"
				>;

				executeSpy(subject);
			},
		);

		await command.execute(["/tmp/pipe.txt"], DServerCommand.createError("root"));

		expect(DServerFile.isFileInterface(executeSpy.mock.calls[0]?.[0])).toBe(true);
		expect(executeSpy.mock.calls[0]?.[0].path).toBe("/tmp/pipe.txt");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports asynchronous tuple subject parsing", async() => {
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
				subject: DP.array(
					DServerDataParser.file({ checkExist: true }),
				),
			},
			({ subject }) => {
				type _CheckSubject = ExpectType<
					typeof subject,
					DServerFile.FileInterface[],
					"strict"
				>;

				executeSpy(subject.map((file) => file.path));
			},
		);

		await command.execute(["/tmp/a.txt", "/tmp/b.txt"], DServerCommand.createError("root"));

		expect(executeSpy).toHaveBeenCalledWith(["/tmp/a.txt", "/tmp/b.txt"]);
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("supports asynchronous single subject parsing", async() => {
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

		await command.execute(["/tmp/async.txt"], DServerCommand.createError("root"));

		expect(executeSpy).toHaveBeenCalledWith("/tmp/async.txt");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("returns command error when tuple subject parsing fails", async() => {
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

		await expect(command.execute(["bad"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
	});

	it("returns command error when single subject parsing fails", async() => {
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

		await expect(command.execute(["bad"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
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

		await command.execute(["one", "two"], DServerCommand.createError("root"));

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

		await command.execute(["42"], DServerCommand.createError("root"));

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

		await command.execute(["head", "1", "2"], DServerCommand.createError("root"));

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

		await command.execute(["1", "2"], DServerCommand.createError("root"));

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

		await command.execute(["42"], DServerCommand.createError("root"));

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

		await command.execute(["42"], DServerCommand.createError("root"));

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

		await command.execute(["admin"], DServerCommand.createError("root"));

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

		await command.execute([], DServerCommand.createError("root"));
		await command.execute(["--name=guest"], DServerCommand.createError("root"));

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

	it("returns command error when option value parsing fails", async() => {
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

		await expect(command.execute(["--enabled=yes"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
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

		await command.execute(["--enabled=yes"], DServerCommand.createError("root"));

		expect(errorSpy).not.toHaveBeenCalled();
		expect(secondOptionSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
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

		await expect(command.execute([], DServerCommand.createError("root"))).rejects.toThrow(userError);
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

		await root.execute(["child", "arg"], DServerCommand.createError("root"));
		await root.execute(["unknown", "arg"], DServerCommand.createError("root"));

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

		await root.execute(["child", "--help"], DServerCommand.createError("root"));

		const renderedHelp = consoleLogSpy.mock.calls.flat().join(" ");

		expect(renderedHelp).toContain("child");
		expect(renderedHelp).not.toContain("root");
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("returns command error when a child command fails", async() => {
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

		await expect(root.execute(["child", "--enabled=yes"], DServerCommand.createError("root"))).resolves.toBe(DServerCommand.SymbolCommandError);
		expect(errorSpy).not.toHaveBeenCalled();
		expect(exitSpy).not.toHaveBeenCalledWith(1);
	});
});
