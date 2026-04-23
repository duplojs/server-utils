import { type ExpectType, C, DP, DPE, S, unwrap } from "@duplojs/utils";
import { DServerCommand } from "@scripts";
import { createError, SymbolCommandError } from "@scripts/command/error";

describe("createOption", () => {
	it("returns undefined when optional option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;

		expect(result.result).toBeUndefined();
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses inline value for optional option", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["--name=duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("parses next argument value for optional option", () => {
		const option = DServerCommand.createOption("name", DP.string());
		const result = option.execute(["--name", "duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when required option is missing", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });
		const error = createError("root");

		expect(option.execute(["subject"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("required option --name");
	});

	it("parses value when required option is present", () => {
		const option = DServerCommand.createOption("name", DP.string(), { required: true });
		const result = option.execute(["--name=duplo", "subject"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			string,
			"strict"
		>;

		expect(result.result).toBe("duplo");
		expect(result.argumentRest).toEqual(["subject"]);
	});

	it("returns command error when value cannot be parsed by schema", () => {
		const option = DServerCommand.createOption("enabled", DP.boolean() as never);
		const error = createError("root");

		expect(option.execute(["--enabled=yes"], error)).toBe(SymbolCommandError);
		expect(error.issues[0]?.expected).toBe("boolean");
	});

	it("supports transform schema and keeps transformed output type", () => {
		const option = DServerCommand.createOption(
			"size",
			DP.transform(
				DP.string(),
				(value) => value.length,
			),
		);

		const result = option.execute(["--size=duplo"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			number | undefined,
			"strict"
		>;

		expect(result.result).toBe(5);
	});

	it("coerces eligible data parser without mutating original schema", () => {
		const schema = DP.number();
		const option = DServerCommand.createOption(
			"count",
			schema,
		);

		const result = option.execute(["--count=42"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _CheckResult = ExpectType<
			typeof result.result,
			number | undefined,
			"strict"
		>;

		expect(result.result).toBe(42);
		expect(schema.definition.coerce).toBe(false);
	});

	it("supports optional option with pipe schema without crashing at execute", () => {
		const option = DServerCommand.createOption(
			"name",
			DPE.string().transform(
				S.toLowerCase,
			),
		);

		const missingResult = option.execute(["subject"], createError("root"));
		const result = option.execute(["--name=PABLO"], createError("root"));
		expect(missingResult).not.toBe(SymbolCommandError);
		expect(result).not.toBe(SymbolCommandError);
		if (missingResult === SymbolCommandError || result === SymbolCommandError) {
			return;
		}

		type _CheckMissingResult = ExpectType<
			typeof missingResult.result,
			Lowercase<string> | undefined,
			"strict"
		>;

		type _CheckResult = ExpectType<
			typeof result.result,
			Lowercase<string> | undefined,
			"strict"
		>;

		expect(missingResult.result).toBeUndefined();
		expect(result.result).toBe("pablo");
		expect(result.argumentRest).toEqual([]);
	});

	it("support optional dataParser", () => {
		const optionOptionalRequired = DServerCommand.createOption(
			"name",
			DPE.string().optional(),
			{ required: true },
		);

		const result = optionOptionalRequired.execute(["--name=guest"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}
		type _check = ExpectType<
			typeof result.result,
			string | undefined,
			"strict"
		>;
		expect(result.result).toBe("guest");

		const optionOptionalNotRequired = DServerCommand.createOption(
			"name",
			DPE.string().optional(),
		);

		const result1 = optionOptionalNotRequired.execute(["--name=guest"], createError("root"));
		expect(result1).not.toBe(SymbolCommandError);
		if (result1 === SymbolCommandError) {
			return;
		}
		type _check1 = ExpectType<
			typeof result1.result,
			string | undefined,
			"strict"
		>;
		expect(result1.result).toBe("guest");
	});

	it("supports clean primitive schema as contract", () => {
		const option = DServerCommand.createOption(
			"count",
			C.Number,
		);

		const result = option.execute(["--count=42"], createError("root"));
		expect(result).not.toBe(SymbolCommandError);
		if (result === SymbolCommandError) {
			return;
		}

		type _check = ExpectType<
			typeof result.result,
			C.Number | undefined,
			"strict"
		>;

		expect(unwrap(result.result)).toBe(42);
	});

	it("supports clean handler contracts", () => {
		const constraintOption = DServerCommand.createOption(
			"count",
			C.Positive,
		);

		const constraintResult = constraintOption.execute(["--count=42"], createError("root"));
		expect(constraintResult).not.toBe(SymbolCommandError);
		if (constraintResult === SymbolCommandError) {
			return;
		}

		type _checkConstraint = ExpectType<
			typeof constraintResult.result,
			C.Positive | undefined,
			"strict"
		>;

		const UserId = C.createNewType(
			"userId",
			DP.number(),
		);

		const newTypeOption = DServerCommand.createOption(
			"user",
			UserId,
			{ required: true },
		);

		const newTypeResult = newTypeOption.execute(["--user=42"], createError("root"));
		expect(newTypeResult).not.toBe(SymbolCommandError);
		if (newTypeResult === SymbolCommandError) {
			return;
		}

		type _checkNewType = ExpectType<
			typeof newTypeResult.result,
			C.GetNewType<typeof UserId>,
			"strict"
		>;

		expect(unwrap(constraintResult.result)).toBe(42);
		expect(unwrap(newTypeResult.result)).toBe(42);
	});

	it("supports clean entity property definition contracts", () => {
		const identifierOption = DServerCommand.createOption(
			"target",
			C.entityPropertyDefinitionTools.identifier("duplo"),
		);

		const identifierResult = identifierOption.execute(["--target=duplo"], createError("root"));
		expect(identifierResult).not.toBe(SymbolCommandError);
		if (identifierResult === SymbolCommandError) {
			return;
		}

		type _checkIdentifier = ExpectType<
			typeof identifierResult.result,
			"duplo" | undefined,
			"strict"
		>;

		const unionOption = DServerCommand.createOption(
			"role",
			C.entityPropertyDefinitionTools.union(
				C.entityPropertyDefinitionTools.identifier("admin"),
				C.entityPropertyDefinitionTools.identifier("client"),
			),
		);

		const unionResult = unionOption.execute(["--role=admin"], createError("root"));
		expect(unionResult).not.toBe(SymbolCommandError);
		if (unionResult === SymbolCommandError) {
			return;
		}

		type _checkUnion = ExpectType<
			typeof unionResult.result,
			"admin" | "client" | undefined,
			"strict"
		>;

		const nullableOption = DServerCommand.createOption(
			"target",
			C.entityPropertyDefinitionTools.nullable(
				C.entityPropertyDefinitionTools.identifier("duplo"),
			),
		);

		const nullableResult = nullableOption.execute(["subject"], createError("root"));
		expect(nullableResult).not.toBe(SymbolCommandError);
		if (nullableResult === SymbolCommandError) {
			return;
		}

		type _checkNullable = ExpectType<
			typeof nullableResult.result,
			"duplo" | null | undefined,
			"strict"
		>;

		expect(identifierResult.result).toBe("duplo");
		expect(unionResult.result).toBe("admin");
		expect(nullableResult.result).toBeUndefined();
	});
});
