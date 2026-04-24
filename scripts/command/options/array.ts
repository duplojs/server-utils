import { hasSomeKinds, pipe, unwrap } from "@duplojs/utils";
import * as SS from "@duplojs/utils/string";
import * as DDP from "@duplojs/utils/dataParser";
import type * as AA from "@duplojs/utils/array";
import * as EE from "@duplojs/utils/either";
import * as CC from "@duplojs/utils/clean";
import { initOption, type Option } from "./base";
import type { EligibleContract } from "../types";
import type { ComputeOptionContract } from "./types";
import { addIssue, addDataParserError } from "../error";

const defaultSeparator = ",";

/**
 * {@include command/createArrayOption/index.md}
 */
export function createArrayOption<
	GenericName extends string,
	GenericContract extends EligibleContract,
	GenericMinValues extends number,
>(
	name: GenericName,
	contract: GenericContract,
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
		...AA.CreateTuple<
			ComputeOptionContract<GenericContract>,
			GenericMinValues
		>,
		...ComputeOptionContract<GenericContract>[],
	]
>;

export function createArrayOption<
	GenericName extends string,
	GenericContract extends EligibleContract,
	GenericMinValues extends number,
>(
	name: GenericName,
	contract: GenericContract,
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
		...AA.CreateTuple<
			ComputeOptionContract<GenericContract>,
			GenericMinValues
		>,
		...ComputeOptionContract<GenericContract>[],
	]
	| undefined
>;

export function createArrayOption(
	name: string,
	contract: EligibleContract,
	params?: {
		description?: string;
		aliases?: readonly string[];
		required?: true;
		min?: number;
		max?: number;
		separator?: string;
	},
) {
	let computeDataParser: DDP.Contract<unknown, unknown> | undefined = undefined;

	if (
		hasSomeKinds(contract, [
			DDP.stringKind,
			DDP.numberKind,
			DDP.bigIntKind,
			DDP.dateKind,
			DDP.timeKind,
			DDP.nilKind,
		])
	) {
		const clone = contract.clone();

		(clone.definition.coerce as any) = true;

		computeDataParser = clone;
	} else if (
		DDP.identifier(contract, DDP.dataParserKind)
	) {
		computeDataParser = contract;
	} else {
		computeDataParser = (
			CC.toMapDataParser as (
				contract: unknown,
				params?: {
					coerce?: boolean;
				},
			) => DDP.Contract<unknown, unknown>
		)(
			contract,
			{ coerce: true },
		);
	}

	const dataParser = pipe(
		computeDataParser,
		DDP.array,
		(schema) => params?.min
			? schema.addChecker(DDP.checkerArrayMin(params.min))
			: schema,
		(schema) => params?.max
			? schema.addChecker(DDP.checkerArrayMax(params.max))
			: schema,
		(schema) => params?.required
			? schema
			: DDP.optional(schema),
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
				? SS.split(value, params?.separator ?? defaultSeparator)
				: undefined;

			const result = dataParser.parse(values);

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
