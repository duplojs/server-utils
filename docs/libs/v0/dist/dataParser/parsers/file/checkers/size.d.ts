import * as DDataParser from "@duplojs/utils/dataParser";
import type * as DServerFile from "../../../../file";
export interface DataParserCheckerDefinitionFileSize extends DDataParser.DataParserCheckerDefinition {
    min?: number;
    max?: number;
}
export interface DataParserCheckerFileSizeInput {
    min?: number;
    max?: number;
}
export declare const checkerFileSizeKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-size", unknown>>;
declare const DataParserCheckerFileSize_base: DDataParser.DataParserCheckerBaseInit<import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-size", unknown>>>;
export declare class DataParserCheckerFileSize extends DataParserCheckerFileSize_base<DataParserCheckerDefinitionFileSize, DServerFile.FileInterface> {
    get classConstructor(): typeof DataParserCheckerFileSize & DDataParser.CheckedConstructorKind;
    isAsynchronous(): boolean;
    static execCheck(value: DServerFile.FileInterface, error: DDataParser.DataParserError, self: DataParserCheckerFileSize, dataParser: DDataParser.DataParser): Promise<DServerFile.FileInterface | typeof DDataParser.SymbolDataParserError>;
    /**
     * Creates a checker that validates the size of an existing file.
     * 
     * The checker reads the file statistics and enforces optional minimum and maximum sizes expressed in bytes.
     * 
     * ```ts
     * const maximumSizeParser = SDP.file({
     * 	checkers: [SDP.checkerFileSize({ max: 2_000_000 })],
     * });
     * await maximumSizeParser.asyncParse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * 
     * const rangedSizeParser = SDP.file({
     * 	checkers: [
     * 		SDP.checkerFileSize({
     * 			min: 10_000,
     * 			max: 2_000_000,
     * 		}),
     * 	],
     * });
     * await rangedSizeParser.asyncParse(
     * 	SF.createFileInterface("/path/archive.zip"),
     * );
     * 
     * await SDP.file()
     * 	.addChecker(SDP.checkerFileSize({ min: 1 }))
     * 	.asyncParse(SF.createFileInterface("/path/document.pdf"));
     * ```
     * 
     * @remarks
     * This checker is asynchronous and also rejects missing resources or resources that are not files. Use `asyncParse` on parsers that contain it.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDP
     * 
     */
    static create(input: DataParserCheckerFileSizeInput, definition?: Partial<Omit<DataParserCheckerDefinitionFileSize, "min" | "max">>): DataParserCheckerFileSize;
}
export declare const checkerFileSize: typeof DataParserCheckerFileSize.create;
export {};
