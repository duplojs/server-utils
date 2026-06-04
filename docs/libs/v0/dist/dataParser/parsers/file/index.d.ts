import { type NeverCoalescing, type FixDeepFunctionInfer } from "@duplojs/utils";
import * as DDataParser from "@duplojs/utils/dataParser";
import * as DServerFile from "../../../file";
export * from "./checkers";
export type DataParserFileCheckers = DDataParser.GetEligibleChecker<DServerFile.FileInterface>;
export interface DataParserDefinitionFile extends DDataParser.DataParserDefinition<DataParserFileCheckers> {
    readonly coerce: boolean;
}
export declare const fileKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/file", unknown>>;
declare const DataParserFile_base: DDataParser.DataParserBaseInit<import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/file", unknown>>>;
export declare class DataParserFile<GenericDefinition extends DataParserDefinitionFile = DataParserDefinitionFile> extends DataParserFile_base<GenericDefinition, DServerFile.FileInterface, DServerFile.FileInterface> {
    get classConstructor(): typeof DataParserFile & DDataParser.CheckedConstructorKind;
    addChecker: <GenericChecker extends readonly [
        DDataParser.DataParserChecker<DDataParser.Output<this>>,
        ...DDataParser.DataParserChecker<DDataParser.Output<this>>[]
    ]>(...args: FixDeepFunctionInfer<readonly [
        DDataParser.DataParserChecker<DDataParser.Output<this>>,
        ...DDataParser.DataParserChecker<DDataParser.Output<this>>[]
    ], GenericChecker>) => DataParserFile<DDataParser.AddCheckersToDefinition<GenericDefinition, GenericChecker>>;
    static execParse(self: DataParserFile, data: unknown, error: DDataParser.DataParserError): DServerFile.FileInterface | typeof DDataParser.SymbolDataParserError;
    static dataParserIsAsynchronous(self: DataParserFile): boolean;
    static prepareDefinition(definition?: Partial<DataParserDefinitionFile>): DataParserDefinitionFile;
    /**
     * Creates a data parser for `FileInterface` values.
     * 
     * The parser validates `FileInterface` inputs and supports path coercion through `SDP.coerce.file()`. File-specific constraints are composed with the `checkers` definition property or `.addChecker(...)`.
     * 
     * ```ts
     * const fileInterface = SF.createFileInterface("path/file.txt");
     * 
     * const basicParser = SDP.file();
     * basicParser.parse(fileInterface);
     * // Error<DataParserError> | Success<SF.FileInterface>
     * 
     * const coerceParser = SDP.coerce.file();
     * coerceParser.parse("/path/readme.md");
     * // Error<DataParserError> | Success<SF.FileInterface>
     * 
     * const constrainedParser = SDP.file({
     * 	checkers: [
     * 		SDP.checkerFileMimeType(/^image\//),
     * 		SDP.checkerFileExist(),
     * 		SDP.checkerFileSize({ max: 2_000_000 }),
     * 	],
     * });
     * await constrainedParser.asyncParse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
     * ```
     * 
     * @remarks
     * Use `asyncParse` when the parser contains asynchronous checkers such as `checkerFileExist` or `checkerFileSize`.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDP
     * 
     */
    static create<const GenericDefinition extends DDataParser.PrepareDataParserDefinition<DataParserDefinitionFile> = never>(definition?: FixDeepFunctionInfer<DDataParser.PrepareDataParserDefinition<DataParserDefinitionFile>, GenericDefinition>): DataParserFile<DDataParser.MergeDefinition<DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}>>>;
}
export declare const file: typeof DataParserFile.create;
