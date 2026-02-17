import { type ExpectType, DP, pipe } from "@duplojs/utils";
import { Command, TESTImplementation, setEnvironment } from "@scripts";

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

		await Command.exec(executeSpy);

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

		await Command.exec(
			{
				options: [Command.createBooleanOption("verbose")],
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
					[string] | undefined,
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
});
