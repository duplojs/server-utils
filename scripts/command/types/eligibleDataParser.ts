import type { SimplifyTopLevel } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";

export type EligibleDataParser = (
	| DDP.DataParserString
	| DDP.DataParserNumber
	| DDP.DataParserBigInt
	| DDP.DataParserDate
	| DDP.DataParserTime
	| DDP.DataParserNil
	| DDP.DataParserTemplateLiteral
	| DDP.DataParserLiteral<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionLiteral, "value">
			& {
				readonly value: readonly string[];
			}
		>
	>
	| DDP.DataParserUnion<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionUnion, "options">
			& {
				readonly options: readonly [
					EligibleDataParser,
					...EligibleDataParser[],
				];
			}
		>
	>
	| DDP.DataParserTransform<
		SimplifyTopLevel<
				& Omit<DDP.DataParserDefinitionTransform, "inner">
				& {
					readonly inner: EligibleDataParser;
				}
		>
	>
	| DDP.DataParserPipe<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionPipe, "input" | "output">
			& {
				readonly input: EligibleDataParser;
				readonly output: EligibleDataParser;
			}
		>
	>
	| DDP.DataParserOptional<
		SimplifyTopLevel<
			& Omit<DDP.DataParserDefinitionOptional, "inner">
			& {
				readonly inner: EligibleDataParser;
			}
		>
	>
);
