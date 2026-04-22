import { unwrap } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import * as DDP from "@duplojs/utils/dataParser";
import { initOption, type Option } from "./base";
import type { EligibleDataParser } from "../types";
import { addIssue, addDataParserError } from "../error";

/**
 * {@include command/createOption/index.md}
 */
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
): Option<GenericName, DDP.Output<GenericSchema>>;

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
): Option<GenericName, DDP.Output<GenericSchema> | undefined>;

export function createOption(
	name: string,
	schema: DDP.DataParser,
	params?: {
		description?: string;
		aliases?: readonly string[];
		required?: true;
	},
) {
	const dataParser = params?.required
		? schema
		: DDP.optional(schema);

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

			const result = dataParser.parse(value);

			if (EE.isLeft(result)) {
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
