import { type ExpectType, DP, pipe } from "@duplojs/utils";
import { DServerCommand, TESTImplementation, setEnvironment } from "@scripts";

describe("exec", () => {
	afterEach(() => {
		setEnvironment("NODE");
		TESTImplementation.clear();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("uses getProcessArguments and executes a root command without params", async() => {
		setEnvironment("TEST");
		const getProcessArgumentsSpy = vi.fn().mockReturnValue([]);
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("getProcessArguments", getProcessArgumentsSpy);
		TESTImplementation.set("exitProcess", exitSpy);

		const promise = DServerCommand.exec(executeSpy);

		type _CheckPromise = ExpectType<
			typeof promise,
			Promise<void>,
			"strict"
		>;

		await promise;

		expect(getProcessArgumentsSpy).toHaveBeenCalledTimes(1);
		expect(executeSpy).toHaveBeenCalledWith({ options: {} });
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("uses getProcessArguments with params overload", async() => {
		setEnvironment("TEST");
		const getProcessArgumentsSpy = vi.fn().mockReturnValue([
			"subject",
			"--verbose",
		]);
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("getProcessArguments", getProcessArgumentsSpy);
		TESTImplementation.set("exitProcess", exitSpy);

		await DServerCommand.exec(
			{
				options: [DServerCommand.createBooleanOption("verbose")],
				subject: DP.tuple([DP.string()]),
			},
			({ options, subject }) => {
				type _CheckOptions = ExpectType<
					typeof options,
					{
						verbose: boolean;
					},
					"strict"
				>;
				type _CheckSubject = ExpectType<
					typeof subject,
					[string],
					"strict"
				>;

				executeSpy({
					options,
					subject,
				});
			},
		);

		expect(getProcessArgumentsSpy).toHaveBeenCalledTimes(1);
		expect(executeSpy).toHaveBeenCalledWith({
			options: {
				verbose: true,
			},
			subject: ["subject"],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});

	it("infers typed tuple subject with params overload and no options", async() => {
		setEnvironment("TEST");
		const getProcessArgumentsSpy = vi.fn().mockReturnValue(["subject"]);
		const exitSpy = vi.fn();
		const executeSpy = vi.fn();
		TESTImplementation.set("getProcessArguments", getProcessArgumentsSpy);
		TESTImplementation.set("exitProcess", exitSpy);

		await DServerCommand.exec(
			{
				subject: DP.tuple([DP.string()]),
			},
			(params) => {
				type check = ExpectType<
					typeof params.subject,
					[string],
					"strict"
				>;

				executeSpy(params);
			},
		);

		expect(getProcessArgumentsSpy).toHaveBeenCalledTimes(1);
		expect(executeSpy).toHaveBeenCalledWith({
			options: {},
			subject: ["subject"],
		});
		expect(exitSpy).toHaveBeenCalledWith(0);
	});
});
