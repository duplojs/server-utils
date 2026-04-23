import { type AnyTuple, type BytesInString, type FixDeepFunctionInfer, type Kind, type NeverCoalescing, createOverride } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import * as dataParsers from "../parsers";
import { type FileInterface } from "@scripts/file";

type _DataParserFileExtended<
	GenericDefinition extends dataParsers.DataParserDefinitionFile,
> = (
	& Kind<typeof dataParsers.fileKind.definition>
	& DDP.DataParserExtended<
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
		DDP.AddCheckersToDefinition<
			GenericDefinition,
			GenericChecker
		>
	>;

	refine(
		theFunction: (input: DDP.Output<this>) => boolean,
		definition?: Partial<
			Omit<DDP.DataParserCheckerDefinitionRefine, "theFunction">
		>
	): DataParserFileExtended<
		DDP.AddCheckersToDefinition<
			GenericDefinition,
			readonly [DDP.CheckerRefineImplementation<DDP.Output<this>>]
		>
	>;

	/** Set a mime type constraint on the parsed file. */
	mimeType(value: string | AnyTuple<string> | RegExp): DataParserFileExtended<GenericDefinition>;

	/**
	 * Set the minimum file size.
	 * This check requires async validation through `asyncParse`.
	 */
	minSize(value: number | BytesInString): DataParserFileExtended<GenericDefinition>;

	/**
	 * Set the maximum file size.
	 * This check requires async validation through `asyncParse`.
	 */
	maxSize(value: number | BytesInString): DataParserFileExtended<GenericDefinition>;

	/**
	 * Require the file to exist.
	 * This check requires async validation through `asyncParse`.
	 */
	mustExist(): DataParserFileExtended<GenericDefinition>;
}

/**
 * {@include dataParserExtended/file/index.md}
 */
export function file<
	const GenericDefinition extends Omit<
		Partial<dataParsers.DataParserDefinitionFile>,
		"mimeType" | "minSize" | "maxSize"
	> = never,
>(
	params?: dataParsers.DataParserFileParams,
	definition?: GenericDefinition,
): DataParserFileExtended<
		DDP.MergeDefinition<
			dataParsers.DataParserDefinitionFile,
			NeverCoalescing<GenericDefinition, {}>
		>
	> {
	const self = DDP.dataParserExtendedInit<
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
						checkExist: self.definition.checkExist,
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
						checkExist: self.definition.checkExist,
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
						checkExist: self.definition.checkExist,
					},
					{
						checkers: self.definition.checkers,
						errorMessage: self.definition.errorMessage,
						coerce: self.definition.coerce,
					},
				);
			},
			mustExist(self) {
				return file(
					{
						mimeType: self.definition.mimeType,
						minSize: self.definition.minSize,
						maxSize: self.definition.maxSize,
						checkExist: true,
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
