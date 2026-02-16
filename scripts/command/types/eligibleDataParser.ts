import type { DP, SimplifyTopLevel } from "@duplojs/utils";

type EligibleDataParserBase = (
	| DP.DataParserString<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionString, "checkers">
			& {
				readonly checkers: readonly (
					| DP.DataParserCheckerEmail
					| DP.DataParserCheckerStringMax
					| DP.DataParserCheckerStringMin
					| DP.DataParserCheckerStringRegex
				)[];
			}
		>
	>
	| DP.DataParserNumber<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionNumber, "checkers" | "coerce">
			& {
				readonly checkers: readonly DP.DataParserCheckerInt[];
				readonly coerce: true;
			}
		>
	>
	| DP.DataParserBigInt<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionBigInt, "checkers" | "coerce">
			& {
				readonly checkers: readonly [];
				readonly coerce: true;
			}
		>
	>
	| DP.DataParserDate<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionDate, "checkers" | "coerce">
			& {
				readonly checkers: readonly [];
				readonly coerce: true;
			}
		>
	>
	| DP.DataParserTime<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionTime, "checkers" | "coerce">
			& {
				readonly checkers: readonly [];
				readonly coerce: true;
			}
		>
	>
	| DP.DataParserLiteral<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionLiteral, "checkers" | "value">
			& {
				readonly checkers: readonly [];
				readonly value: readonly string[];
			}
		>
	>
	| DP.DataParserNil<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionNil, "checkers" | "coerce">
			& {
				readonly checkers: readonly [];
				readonly coerce: true;
			}
		>
	>
	| DP.DataParserTemplateLiteral<
		SimplifyTopLevel<
			& Omit<DP.DataParserDefinitionTemplateLiteral, "checkers">
			& { readonly checkers: readonly [] }
		>
	>
);

type EligibleDataParserUnion = DP.DataParserUnion<
	SimplifyTopLevel<
	& Omit<DP.DataParserDefinitionUnion, "checkers" | "options">
	& {
		readonly checkers: readonly [];
		readonly options: readonly [
			EligibleDataParserBase,
			...EligibleDataParserBase[],
		];
	}
	>
>;

export type EligibleDataParser = EligibleDataParserBase | EligibleDataParserUnion;
