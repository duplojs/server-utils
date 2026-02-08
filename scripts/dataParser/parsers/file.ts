import { type BytesInString, createOverride, DP, E, stringToBytes, unwrap, type FixDeepFunctionInfer, type Kind, type O, type NeverCoalescing, toRegExp } from "@duplojs/utils";
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
	readonly checkExist: boolean;
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
	checkExist?: boolean;
}

/**
 * {@include dataParser/file/index.md}
 */
export function file<
	const GenericDefinition extends Omit<
		Partial<DataParserDefinitionFile>,
		"mimeType" | "minSize" | "maxSize" | "checkExist"
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
			checkExist: params?.checkExist ?? false,
			maxSize: params?.maxSize !== undefined
				? stringToBytes(params.maxSize)
				: undefined,
			minSize: params?.minSize !== undefined
				? stringToBytes(params.minSize)
				: undefined,
			mimeType: params?.mimeType
				? toRegExp(params.mimeType)
				: undefined,
		},
		{
			sync: (data, error, self) => {
				if (
					self.definition.checkExist
					|| self.definition.maxSize !== undefined
					|| self.definition.minSize !== undefined
				) {
					return DP.SymbolDataParserErrorPromiseIssue;
				}

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
						.test(fileInterface.getMimeType() ?? "")
				) {
					DP.addIssue(error, self, data, "Wrong mimeType.");
					return DP.SymbolDataParserError;
				}

				return fileInterface;
			},
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
						.test(fileInterface.getMimeType() ?? "")
				) {
					DP.addIssue(error, self, data, "Wrong mimeType.");
					return DP.SymbolDataParserError;
				}

				if (
					self.definition.checkExist
					|| self.definition.maxSize !== undefined
					|| self.definition.minSize !== undefined
				) {
					const resultStats = await fileInterface.stat();

					if (E.isLeft(resultStats)) {
						DP.addIssue(error, self, data, "File not exist.");
						return DP.SymbolDataParserError;
					}

					const stat = unwrap(resultStats);

					if (!stat.isFile) {
						DP.addIssue(error, self, data, "Is not file.");
						return DP.SymbolDataParserError;
					}

					if (
						self.definition.maxSize !== undefined
					&& stat.sizeBytes > self.definition.maxSize
					) {
						DP.addIssue(error, self, data, "File is to large.");
						return DP.SymbolDataParserError;
					}

					if (
						self.definition.minSize !== undefined
					&& stat.sizeBytes < self.definition.minSize
					) {
						DP.addIssue(error, self, data, "File is to small.");
						return DP.SymbolDataParserError;
					}
				}

				return fileInterface;
			},
			isAsynchronous: (self) => self.definition.checkExist
			|| self.definition.maxSize !== undefined
			|| self.definition.minSize !== undefined,
		},
		file.overrideHandler,
	);

	return self as never;
}

file.overrideHandler = createOverride<DataParserFile>("@duplojs/server-utils/data-parser/file");
