import { A, type RemoveKind, S, type Kind } from "@duplojs/utils";
import { createDuplojsServerUtilsKind } from "@scripts/kind";
import { addIssue, type CommandError, SymbolCommandError } from "../error";

const optionKind = createDuplojsServerUtilsKind("command-option");
const regexOption = /^(?<dashes>-{1,2})(?<key>[A-Za-z0-9][A-Za-z0-9_-]*)(?:=(?<value>.*))?$/;

export interface Option<
	GenericName extends string = string,
	GenericExecuteOutputValue extends unknown = unknown,
> extends Kind<typeof optionKind.definition> {
	readonly name: GenericName;
	readonly description: string | null;
	readonly aliases: readonly string[];
	readonly hasValue: boolean;
	execute(
		args: readonly string[],
		error: CommandError,
	):
	| {
		result: GenericExecuteOutputValue;
		argumentRest: readonly string[];
	}
	| SymbolCommandError;
}

export interface InitOptionExecuteParams {
	isHere: boolean;
	value: string | undefined;
}

export function initOption<
	GenericName extends string,
	GenericExecuteOutputValue extends unknown,
>(
	name: GenericName,
	execute: (
		params: InitOptionExecuteParams,
		error: CommandError,
	) => GenericExecuteOutputValue | SymbolCommandError,
	params?: {
		description?: string;
		aliases?: readonly string[];
		hasValue?: boolean;
	},
) {
	const self: Option<GenericName, GenericExecuteOutputValue> = optionKind.setTo({
		name,
		execute: (
			args: readonly string[],
			error: CommandError,
		) => {
			const result = A.reduce(
				args,
				A.reduceFrom(null),
				({ element, next, exit, index }) => {
					const extractResult = S.extract(element, regexOption);

					if (!extractResult) {
						return next(null);
					}

					const result = {
						key: extractResult.namedGroups!.key!,
						value: extractResult.namedGroups?.value,
						index,
					};

					if (self.name !== result.key && !A.includes(self.aliases, result.key)) {
						return next(null);
					}

					return exit(result);
				},
			);

			if (!result) {
				const executeResult = execute(
					{
						isHere: false,
						value: undefined,
					},
					error,
				);

				if (executeResult === SymbolCommandError) {
					return SymbolCommandError;
				}

				return {
					result: executeResult,
					argumentRest: args,
				};
			} else if (self.hasValue) {
				const value = result.value ?? args[result.index + 1];
				const isOption = S.test(value ?? "", regexOption);

				if (isOption) {
					return addIssue(
						error,
						{
							type: "option",
							target: self.name,
							expected: `value for option --${self.name}`,
							received: value,
							message: `Missing value for option "${self.name}": received another option token instead of a value.`,
						},
					);
				}

				const executeResult = execute(
					{
						isHere: true,
						value,
					},
					error,
				);

				if (executeResult === SymbolCommandError) {
					return SymbolCommandError;
				}

				return {
					result: executeResult,
					argumentRest: A.spliceDelete(
						args,
						result.index,
						result.value === undefined && args[result.index + 1] !== undefined
							? 2
							: 1,
					),
				};
			} else if (!self.hasValue && result.value !== undefined) {
				return addIssue(
					error,
					{
						type: "option",
						target: self.name,
						expected: `option without value --${self.name}`,
						received: result.value,
						message: `Option "${self.name}" does not accept a value.`,
					},
				);
			}

			const executeResult = execute(
				{
					isHere: true,
					value: undefined,
				},
				error,
			);

			if (executeResult === SymbolCommandError) {
				return SymbolCommandError;
			}

			return {
				result: executeResult,
				argumentRest: A.spliceDelete(args, result.index, 1),
			};
		},
		aliases: params?.aliases ?? [],
		description: params?.description ?? null,
		hasValue: params?.hasValue ?? false,
	} satisfies RemoveKind<Option>);

	return self;
}
