import { hasSomeKinds, unwrap } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import * as EE from "@duplojs/utils/either";
import * as CC from "@duplojs/utils/clean";
import { initOption, type Option } from "./base";
import type { EligibleContract } from "../types";
import type { ComputeOptionContract } from "./types";
import { addIssue, addDataParserError } from "../error";

/**
 * {@include command/createOption/index.md}
 */
export function createOption<
	GenericName extends string,
	GenericContract extends EligibleContract,
	GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>,
>(
	name: GenericName,
	contract: GenericContract,
	params: {
		description?: string;
		aliases?: readonly string[];
		required: true;
	},
): Option<GenericName, GenericOutput>;

export function createOption<
	GenericName extends string,
	GenericContract extends EligibleContract,
	GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>,
>(
	name: GenericName,
	contract: GenericContract,
	params?: {
		description?: string;
		aliases?: readonly string[];
	},
): Option<GenericName, GenericOutput | undefined>;

export function createOption(
	name: string,
	contract: EligibleContract,
	params?: {
		description?: string;
		aliases?: readonly string[];
		required?: true;
	},
): any {
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

	const dataParser = params?.required
		? computeDataParser
		: DDP.optional(computeDataParser);

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
