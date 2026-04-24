import { type ExpectType, C, DP, pipe, S, unwrap } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("createArrayOption", () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("returns undefined when optional option is missing", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		type _checkOption = ExpectType<
			typeof option,
			DServerCommand.Option<"tags", string[] | undefined>,
			"strict"
		>;

		const result = option.execute(["subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _checkResult = ExpectType<
			typeof result.result,
			string[] | undefined,
			"strict"
		>;

		expect(result.result).toBeUndefined();
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses comma separated inline values by default", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		const result = option.execute(["--tags=one,two", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type check = ExpectType<
			typeof result,
			{
				result: string[] | undefined;
				argumentRest: readonly string[];
			},
			"strict"
		>;

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value with custom separator", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { separator: "|" });

		const result = option.execute(["--tags", "one|two", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when required option is missing", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { required: true });
		const error = createError("root");

		expect(option.execute(["subject"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("required option --tags");
	});

	it("returns command error when min checker is not satisfied", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { min: 2 });
		const error = createError("root");

		expect(option.execute(["--tags=one"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("array.length >= 2");
	});

	it("returns command error when max checker is exceeded", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { max: 1 });
		const error = createError("root");

		expect(option.execute(["--tags=one,two"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("array.length <= 1");
	});

	it("supports aliases", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string(), { aliases: ["t"] });

		const result = option.execute(["-t=one,two", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual(["one", "two"]);
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("works when called from pipe", () => {
		const option = DServerCommand.createArrayOption("tags", DP.string());

		const result = pipe(["--tags=one,two"], (args) => option.execute(args, createError("root")));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toEqual(["one", "two"]);
	});

	it("supports transform and pipe schemas with typed array output", () => {
		const option = DServerCommand.createArrayOption(
			"sizes",
			DP.pipe(
				DP.string(),
				DP.transform(
					DP.string(),
					S.length,
				),
			),
			{ required: true },
		);

		const result = option.execute(["--sizes=duplo,js"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			number[],
			"strict"
		>;

		expect(result.result).toEqual([5, 2]);
		expect(result.argumentRest).toEqual([]);
	});

	it("supports clean handler contracts with typed array output", () => {
		const numberOption = DServerCommand.createArrayOption(
			"counts",
			C.Number,
			{
				required: true,
				min: 1,
			},
		);

		const numberResult = numberOption.execute(["--counts=42,43"], createError("root"));
		expect(numberResult).not.toBe(SymbolCommandError);
		if (numberResult === SymbolCommandError) {
			return;
		}

		type _checkNumberResult = ExpectType<
			typeof numberResult.result,
			[C.Number, ...C.Number[]],
			"strict"
		>;

		const UserId = C.createNewType(
			"userId",
			DP.number(),
		);
		const userOption = DServerCommand.createArrayOption(
			"users",
			UserId,
			{ required: true },
		);

		const userResult = userOption.execute(["--users=1,2"], createError("root"));
		expect(userResult).not.toBe(SymbolCommandError);
		if (userResult === SymbolCommandError) {
			return;
		}

		type _checkUserResult = ExpectType<
			typeof userResult.result,
			C.GetNewType<typeof UserId>[],
			"strict"
		>;

		expect(numberResult.result.map(unwrap)).toEqual([42, 43]);
		expect(userResult.result.map(unwrap)).toEqual([1, 2]);
	});

	it("supports clean entity property definition contracts with typed array output", () => {
		const option = DServerCommand.createArrayOption(
			"roles",
			C.entityPropertyDefinitionTools.union(
				C.entityPropertyDefinitionTools.identifier("admin"),
				C.entityPropertyDefinitionTools.identifier("client"),
			),
		);

		const result = option.execute(["--roles=admin,client"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _checkResult = ExpectType<
			typeof result.result,
			("admin" | "client")[] | undefined,
			"strict"
		>;

		expect(result.result).toEqual(["admin", "client"]);
	});
});
