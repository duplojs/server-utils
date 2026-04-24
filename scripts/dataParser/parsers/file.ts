import { type BytesInString, createOverride, stringToBytes, unwrap, type FixDeepFunctionInfer, type Kind, type NeverCoalescing, toRegExp, type AnyTuple } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import type * as OO from "@duplojs/utils/object";
import * as EE from "@duplojs/utils/either";
import { createFileInterface, isFileInterface, type FileInterface } from "@scripts/file";
import { createDataParserKind } from "../kind";

export interface DataParserFileCheckerCustom {}

export type DataParserFileCheckers = (
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	| DataParserFileCheckerCustom[
		OO.GetPropsWithValueExtends<
			DataParserFileCheckerCustom,
			DDP.DataParserChecker
		>
	]
	| DDP.CheckerRefineImplementation<FileInterface>
);

export interface DataParserDefinitionFile extends DDP.DataParserDefinition<
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
	& DDP.DataParser<
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
		DDP.AddCheckersToDefinition<
			GenericDefinition,
			GenericChecker
		>
	>;
}

export interface DataParserFileParams {
	readonly mimeType?: string | AnyTuple<string> | RegExp;
	readonly minSize?: number | BytesInString;
	readonly maxSize?: number | BytesInString;
	readonly checkExist?: boolean;
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
		DDP.MergeDefinition<
			DataParserDefinitionFile,
			NeverCoalescing<GenericDefinition, {}>
		>
	> {
	const self = DDP.dataParserInit<DataParserFile>(
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
					return DDP.addIssue(
						error,
						"async data parser",
						data,
						self.definition.errorMessage,
					);
				}

				let fileInterface = data;

				if (self.definition.coerce && typeof fileInterface === "string") {
					fileInterface = createFileInterface(fileInterface);
				}

				if (!isFileInterface(fileInterface)) {
					return DDP.addIssue(
						error,
						"file",
						data,
						self.definition.errorMessage,
					);
				}

				if (
					self.definition.mimeType
					&& !self
						.definition
						.mimeType
						.test(fileInterface.getMimeType() ?? "")
				) {
					return DDP.addIssue(
						error,
						`file with mime type matching ${self.definition.mimeType.source}`,
						data,
						"Wrong mimeType.",
					);
				}

				return fileInterface;
			},
			async: async(data, error, self) => {
				let fileInterface = data;

				if (self.definition.coerce && typeof fileInterface === "string") {
					fileInterface = createFileInterface(fileInterface);
				}

				if (!isFileInterface(fileInterface)) {
					return DDP.addIssue(
						error,
						"file",
						data,
						self.definition.errorMessage,
					);
				}

				if (
					self.definition.mimeType
					&& !self
						.definition
						.mimeType
						.test(fileInterface.getMimeType() ?? "")
				) {
					return DDP.addIssue(
						error,
						`file with mime type matching ${self.definition.mimeType.source}`,
						fileInterface,
						"Wrong mimeType.",
					);
				}

				if (
					self.definition.checkExist
					|| self.definition.maxSize !== undefined
					|| self.definition.minSize !== undefined
				) {
					const resultStats = await fileInterface.stat();

					if (EE.isLeft(resultStats)) {
						return DDP.addIssue(
							error,
							"existing file",
							fileInterface,
							"File not exist.",
						);
					}

					const stat = unwrap(resultStats);

					if (!stat.isFile) {
						return DDP.addIssue(
							error,
							"file",
							stat,
							"Is not file.",
						);
					}

					if (
						self.definition.maxSize !== undefined
						&& stat.sizeBytes > self.definition.maxSize
					) {
						return DDP.addIssue(
							error,
							`file with sizeBytes <= ${self.definition.maxSize}`,
							stat.sizeBytes,
							"File is to large.",
						);
					}

					if (
						self.definition.minSize !== undefined
						&& stat.sizeBytes < self.definition.minSize
					) {
						return DDP.addIssue(
							error,
							`file with sizeBytes >= ${self.definition.minSize}`,
							stat.sizeBytes,
							"File is to small.",
						);
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
