import { type BytesInString, DP, type FixDeepFunctionInfer, type Kind, type NeverCoalescing, createOverride } from "@duplojs/utils";
import * as dataParsers from "../parsers";
import { type FileInterface } from "@scripts/file";

type _DataParserFileExtended<
	GenericDefinition extends dataParsers.DataParserDefinitionFile,
> = (
	& Kind<typeof dataParsers.fileKind.definition>
	& DP.DataParserExtended<
		GenericDefinition,
		FileInterface,
		FileInterface
	>
);

export interface DataParserFileExtended<
	GenericDefinition extends dataParsers.DataParserDefinitionFile = dataParsers.DataParserDefinitionFile,
> extends _DataParserFileExtended<GenericDefinition> {
	addChecker<
		GenericChecker extends readonly [
			dataParsers.DataParserFileCheckers,
			...dataParsers.DataParserFileCheckers[],
		],
	>(
		...args: FixDeepFunctionInfer<
			readonly [
				dataParsers.DataParserFileCheckers,
				...dataParsers.DataParserFileCheckers[],
			],
			GenericChecker
		>
	): DataParserFileExtended<
		DP.AddCheckersToDefinition<
			GenericDefinition,
			GenericChecker
		>
	>;

	refine(
		theFunction: (input: DP.Output<this>) => boolean,
		definition?: Partial<
			Omit<DP.DataParserCheckerDefinitionRefine, "theFunction">
		>
	): DataParserFileExtended<
		DP.AddCheckersToDefinition<
			GenericDefinition,
			readonly [DP.CheckerRefineImplementation<DP.Output<this>>]
		>
	>;

	mimeType(value: string | string[] | RegExp): DataParserFileExtended<GenericDefinition>;

	minSize(value: number | BytesInString): DataParserFileExtended<GenericDefinition>;

	maxSize(value: number | BytesInString): DataParserFileExtended<GenericDefinition>;
}

export function file<
	const GenericDefinition extends Omit<
		Partial<dataParsers.DataParserDefinitionFile>,
		"mimeType" | "minSize" | "maxSize"
	> = never,
>(
	params?: dataParsers.DataParserFileParams,
	definition?: GenericDefinition,
): DataParserFileExtended<
		DP.MergeDefinition<
			dataParsers.DataParserDefinitionFile,
			NeverCoalescing<GenericDefinition, {}>
		>
	> {
	const self = DP.dataParserExtendedInit<
		dataParsers.DataParserFile,
		DataParserFileExtended
	>(
		dataParsers.file(params, definition),
		{
			mimeType(self, value) {
				return file(
					{
						mimeType: value,
						minSize: self.definition.minSize,
						maxSize: self.definition.maxSize,
					},
					{
						checkers: self.definition.checkers,
						errorMessage: self.definition.errorMessage,
						coerce: self.definition.coerce,
					},
				);
			},
			minSize(self, value) {
				return file(
					{
						mimeType: self.definition.mimeType,
						minSize: value,
						maxSize: self.definition.maxSize,
					},
					{
						checkers: self.definition.checkers,
						errorMessage: self.definition.errorMessage,
						coerce: self.definition.coerce,
					},
				);
			},
			maxSize(self, value) {
				return file(
					{
						mimeType: self.definition.mimeType,
						minSize: self.definition.minSize,
						maxSize: value,
					},
					{
						checkers: self.definition.checkers,
						errorMessage: self.definition.errorMessage,
						coerce: self.definition.coerce,
					},
				);
			},
		},
		file.overrideHandler,
	);

	return self as never;
}

file.overrideHandler = createOverride<DataParserFileExtended>("@duplojs/utils/data-parser-extended/bigint");
