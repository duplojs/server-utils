import { type A, DP, E, pipe, S, unwrap } from "@duplojs/utils";
import { initOption, type Option } from "./base";
import type { EligibleDataParser } from "../types";
import { addIssue, addDataParserError } from "../error";

const defaultSeparator = ",";

/**
 * {@include command/createArrayOption/index.md}
 */
export function createArrayOption<
	GenericName extends string,
	GenericSchema extends EligibleDataParser,
	GenericMinValues extends number,
>(
	name: GenericName,
	schema: GenericSchema,
	params: {
		description?: string;
		aliases?: readonly string[];
		min?: GenericMinValues;
		max?: number;
		required: true;
		separator?: string;
	},
): Option<
	GenericName,
	[
		...A.CreateTuple<
			DP.Output<GenericSchema>,
			GenericMinValues
		>,
		...DP.Output<GenericSchema>[],
	]
>;

export function createArrayOption<
	GenericName extends string,
	GenericSchema extends EligibleDataParser,
	GenericMinValues extends number,
>(
	name: GenericName,
	schema: GenericSchema,
	params?: {
		description?: string;
		aliases?: readonly string[];
		min?: GenericMinValues;
		max?: number;
		separator?: string;
	},
): Option<
	GenericName,
	| [
		...A.CreateTuple<
			DP.Output<GenericSchema>,
			GenericMinValues
		>,
		...DP.Output<GenericSchema>[],
	]
	| undefined
>;

export function createArrayOption(
	name: string,
	schema: DP.DataParser,
	params?: {
		description?: string;
		aliases?: readonly string[];
		required?: true;
		min?: number;
		max?: number;
		separator?: string;
	},
) {
	const dataParser = pipe(
		schema,
		DP.array,
		(schema) => params?.min
			? schema.addChecker(DP.checkerArrayMin(params.min))
			: schema,
		(schema) => params?.max
			? schema.addChecker(DP.checkerArrayMax(params.max))
			: schema,
		(schema) => params?.required
			? schema
			: DP.optional(schema),
	);

	return initOption(
		name,
		({ isHere, value }, error) => {
			if (!isHere && params?.required) {
				return addIssue(
					error,
					{
						type: "option",
						target: name,
						expected: `required option --${name}`,
						received: value,
						message: `Option "${name}" is required.`,
					},
				);
			}

			const values = value !== undefined
				? S.split(value, params?.separator ?? defaultSeparator)
				: undefined;

			const result = dataParser.parse(values);

			if (E.isLeft(result)) {
				return addDataParserError(
					error,
					unwrap(result),
					{
						type: "option",
						target: name,
					},
				);
			}

			return unwrap(result);
		},
		{
			description: params?.description,
			aliases: params?.aliases,
			hasValue: true,
		},
	);
}
