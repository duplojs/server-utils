
import type * as dataParsers from "../../parsers";
import * as dataParsersExtended from "..";
import { type DP, type NeverCoalescing } from "@duplojs/utils";

export function file<
	const GenericDefinition extends Omit<
		Partial<dataParsers.DataParserDefinitionFile>,
		"mimeType" | "minSize" | "maxSize" | "coerce"
	> = never,
>(
	params?: dataParsers.DataParserFileParams,
	definition?: GenericDefinition,
): dataParsersExtended.DataParserFileExtended<
		DP.MergeDefinition<
			dataParsers.DataParserDefinitionFile,
			NeverCoalescing<GenericDefinition, {}> & { coerce: true }
		>
	> {
	return dataParsersExtended.file(
		params,
		{
			...definition,
			coerce: true,
		},
	);
}
