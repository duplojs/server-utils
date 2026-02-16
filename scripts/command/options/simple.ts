import { DP } from "@duplojs/utils";
import { initOption, type Option } from "./base";
import type { EligibleDataParser } from "../types";
import { CommandOptionRequiredError } from "../errors";

export function createOption<
	GenericName extends string,
	GenericSchema extends EligibleDataParser,
>(
	name: GenericName,
	schema: GenericSchema,
	params: {
		description?: string;
		aliases?: readonly string[];
		required: true;
	},
): Option<GenericName, DP.Output<GenericSchema>>;

export function createOption<
	GenericName extends string,
	GenericSchema extends EligibleDataParser,
>(
	name: GenericName,
	schema: GenericSchema,
	params?: {
		description?: string;
		aliases?: readonly string[];
	},
): Option<GenericName, DP.Output<GenericSchema> | undefined>;

export function createOption(
	name: string,
	schema: DP.DataParser,
	params?: {
		description?: string;
		aliases?: readonly string[];
		required?: true;
	},
) {
	const dataParser = params?.required
		? schema
		: DP.optional(schema);

	return initOption(
		name,
		({ isHere, value }) => {
			if (!isHere && params?.required) {
				throw new CommandOptionRequiredError(name);
			}

			return dataParser.parseOrThrow(value);
		},
		{
			description: params?.description,
			aliases: params?.aliases,
			hasValue: true,
		},
	);
}
