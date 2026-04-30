import { hasSomeKinds, type AnyTuple, type SimplifyTopLevel, type ExpectType } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import * as AA from "@duplojs/utils/array";
import * as CC from "@duplojs/utils/clean";
import * as SDP from "@scripts/dataParser";
import type { ComputeEligibleCleanType, EligibleCleanType, EligibleDataParser } from "../types";

export type Subject = (
	| EligibleDataParser
	| DDP.DataParserArray<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionArray, "element">
			& {
				readonly element: EligibleDataParser;
			}
		>
	>
	| DDP.AdvancedContract<
		DDP.DataParserTuple<
			SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionTuple, "shape" | "rest">
			& {
				readonly shape: readonly [
					EligibleDataParser,
					...EligibleDataParser[],
				];
				readonly rest: EligibleDataParser | undefined;
			}
			>
		>
	>
	| EligibleCleanType
	| AnyTuple<EligibleCleanType | EligibleDataParser>
);

export type ComputeSubject<
	GenericSubject extends Subject,
> = [GenericSubject] extends [DDP.DataParser]
	? DDP.Output<GenericSubject>
	: [GenericSubject] extends [EligibleCleanType]
		? ComputeEligibleCleanType<GenericSubject>
		: [GenericSubject] extends [AnyTuple<EligibleCleanType | EligibleDataParser>]
			? {
				[GenericKey in keyof GenericSubject]:
				GenericSubject[GenericKey] extends EligibleCleanType | EligibleDataParser
					? ComputeSubject<GenericSubject[GenericKey]>
					: never
			}
			: never;

export function subjectToDataParser(
	contract: Subject,
): DDP.DataParser {
	if (
		hasSomeKinds(contract, [
			DDP.numberKind,
			DDP.bigIntKind,
			DDP.dateKind,
			DDP.timeKind,
			DDP.nilKind,
			SDP.fileKind,
		])
	) {
		const clone = contract.clone();

		(clone.definition.coerce as any) = true;

		return clone;
	} else if (DDP.identifier(contract, DDP.arrayKind)) {
		return DDP.array(
			subjectToDataParser(contract.definition.element),
			contract.definition,
		);
	} else if (DDP.identifier(contract, DDP.tupleKind)) {
		return DDP.tuple(
			AA.mapTuple(
				contract.definition.shape,
				(part) => subjectToDataParser(part),
			),
			{
				...contract.definition,
				rest: contract.definition.rest
					? subjectToDataParser(contract.definition.rest)
					: undefined,
			},
		);
	} else if (contract instanceof Array) {
		return DDP.tuple(
			AA.mapTuple(
				contract as never,
				subjectToDataParser,
			),
		);
	} else if (
		hasSomeKinds(
			contract,
			[
				DDP.unionKind,
				DDP.pipeKind,
				DDP.optionalKind,
				DDP.literalKind,
				DDP.transformKind,
				DDP.templateLiteralKind,
				DDP.stringKind,
			],
		)
	) {
		return contract;
	} else {
		type _check = ExpectType<
			typeof contract,
			EligibleCleanType,
			"strict"
		>;
		return CC.toMapDataParser(
			contract as never,
			{ coerce: true },
		);
	}
}

export function isMultiSubject(subject: Subject): boolean {
	return subject instanceof Array
	|| hasSomeKinds(
		subject,
		[
			DDP.tupleKind,
			DDP.arrayKind,
			CC.entityPropertyArrayKind,
		],
	);
}
