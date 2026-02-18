import { type A, DP, pipe, S } from "@duplojs/utils";
import { initOption, type Option } from "./base";
import type { EligibleDataParser } from "../types";
import { CommandOptionRequiredError } from "../errors";

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
		({ isHere, value }) => {
			if (!isHere && params?.required) {
				throw new CommandOptionRequiredError(name);
			}

			const values = value !== undefined
				? S.split(value, params?.separator ?? defaultSeparator)
				: undefined;

			return dataParser.parseOrThrow(values);
		},
		{
			description: params?.description,
			aliases: params?.aliases,
			hasValue: true,
		},
	);
}
