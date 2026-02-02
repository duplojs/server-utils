import { type BytesInString, createOverride, DP, E, stringToBytes, unwrap, type FixDeepFunctionInfer, type Kind, type O, P, isType, forward, escapeRegExp, innerPipe, A, type NeverCoalescing } from "@duplojs/utils";
import { createFileInterface, isFileInterface, type FileInterface } from "@scripts/file";
import { createDataParserKind } from "../kind";

export interface DataParserFileCheckerCustom {}

export type DataParserFileCheckers = (
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	| DataParserFileCheckerCustom[
		O.GetPropsWithValueExtends<
			DataParserFileCheckerCustom,
			DP.DataParserChecker
		>
	]
	| DP.CheckerRefineImplementation<FileInterface>
);

export interface DataParserDefinitionFile extends DP.DataParserDefinition<
	DataParserFileCheckers
> {
	readonly coerce: boolean;
	readonly mimeType?: RegExp;
	readonly minSize?: number;
	readonly maxSize?: number;
}

export const fileKind = createDataParserKind("file");

type _DataParserFile<
	GenericDefinition extends DataParserDefinitionFile,
> = (
	& DP.DataParser<
		GenericDefinition,
		FileInterface,
		FileInterface
	>
	& Kind<typeof fileKind.definition>
);

export interface DataParserFile<
	GenericDefinition extends DataParserDefinitionFile = DataParserDefinitionFile,
> extends _DataParserFile<GenericDefinition> {
	addChecker<
		GenericChecker extends readonly [
			DataParserFileCheckers,
			...DataParserFileCheckers[],
		],
	>(
		...args: FixDeepFunctionInfer<
			readonly [
				DataParserFileCheckers,
				...DataParserFileCheckers[],
			],
			GenericChecker
		>
	): DataParserFile<
		DP.AddCheckersToDefinition<
			GenericDefinition,
			GenericChecker
		>
	>;
}

export interface DataParserFileParams {
	mimeType?: string | string[] | RegExp;
	minSize?: number | BytesInString;
	maxSize?: number | BytesInString;
}

export function file<
	const GenericDefinition extends Omit<
		Partial<DataParserDefinitionFile>,
		"mimeType" | "minSize" | "maxSize"
	> = never,
>(
	params?: DataParserFileParams,
	definition?: GenericDefinition,
): DataParserFile<
		DP.MergeDefinition<
			DataParserDefinitionFile,
			NeverCoalescing<GenericDefinition, {}>
		>
	> {
	const self = DP.dataParserInit<DataParserFile>(
		fileKind,
		{
			errorMessage: definition?.errorMessage,
			checkers: definition?.checkers ?? [],
			coerce: definition?.coerce ?? false,
			maxSize: params?.maxSize !== undefined
				? stringToBytes(params.maxSize)
				: undefined,
			minSize: params?.minSize !== undefined
				? stringToBytes(params.minSize)
				: undefined,
			mimeType: P.match(params?.mimeType)
				.when(
					isType("undefined"),
					forward,
				)
				.when(
					isType("string"),
					(value) => new RegExp(escapeRegExp(value)),
				)
				.when(
					isType("array"),
					innerPipe(
						A.map(escapeRegExp),
						A.join("|"),
						(value) => new RegExp(value),
					),
				)
				.otherwise(forward),
		},
		{
			sync: () => DP.SymbolDataParserErrorPromiseIssue,
			async: async(data, error, self) => {
				let fileInterface = data;

				if (self.definition.coerce && typeof fileInterface === "string") {
					fileInterface = createFileInterface(fileInterface);
				}

				if (!isFileInterface(fileInterface)) {
					return DP.SymbolDataParserErrorIssue;
				}

				if (
					self.definition.mimeType
					&& !self
						.definition
						.mimeType
						.test(
							fileInterface.metadata?.mimeType
							?? fileInterface.getMimeType()
							?? "",
						)
				) {
					return DP.SymbolDataParserErrorIssue;
				}

				const resultStats = await fileInterface.stat();

				if (E.isLeft(resultStats)) {
					return DP.SymbolDataParserErrorIssue;
				}

				const stat = unwrap(resultStats);

				if (!stat.isFile) {
					return DP.SymbolDataParserErrorIssue;
				}
				if (
					self.definition.maxSize !== undefined
					&& stat.sizeBytes > self.definition.maxSize
				) {
					return DP.SymbolDataParserErrorIssue;
				}

				if (
					self.definition.minSize !== undefined
					&& stat.sizeBytes < self.definition.minSize
				) {
					return DP.SymbolDataParserErrorIssue;
				}

				return fileInterface;
			},
			isAsynchronous: () => true,
		},
		file.overrideHandler,
	);

	return self as never;
}

file.overrideHandler = createOverride<DataParserFile>("@duplojs/server-utils/data-parser/file");
