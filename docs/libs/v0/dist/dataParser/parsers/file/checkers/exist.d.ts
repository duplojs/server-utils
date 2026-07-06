import * as DDataParser from "@duplojs/utils/dataParser";
import type * as DServerFile from "../../../../file";
export interface DataParserCheckerDefinitionFileExist extends DDataParser.DataParserCheckerDefinition {
}
export declare const checkerFileExistKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-exist", unknown>>;
declare const DataParserCheckerFileExist_base: DDataParser.DataParserCheckerBaseInit<import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-exist", unknown>>>;
export declare class DataParserCheckerFileExist extends DataParserCheckerFileExist_base<DataParserCheckerDefinitionFileExist, DServerFile.FileInterface> {
    get classConstructor(): typeof DataParserCheckerFileExist & DDataParser.CheckedConstructorKind;
    isAsynchronous(): boolean;
    static execCheck(value: DServerFile.FileInterface, error: DDataParser.DataParserError, self: DataParserCheckerFileExist, dataParser: DDataParser.DataParser): unknown;
    /**
     * Creates a checker that requires an existing regular file.
     * 
     * The checker reads the file statistics and rejects missing resources and resources that are not files.
     * 
     * ```ts
     * const parser = SDP.file({
     * 	checkers: [SDP.checkerFileExist()],
     * });
     * await parser.asyncParse(
     * 	SF.createFileInterface("/path/document.pdf"),
     * );
     * 
     * const withOtherChecker = SDP.file({
     * 	checkers: [
     * 		SDP.checkerFileExist(),
     * 		SDP.checkerFileMimeType(/^image\//),
     * 	],
     * });
     * await withOtherChecker.asyncParse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * 
     * await SDP.file()
     * 	.addChecker(SDP.checkerFileExist())
     * 	.asyncParse(SF.createFileInterface("/path/archive.zip"));
     * ```
     * 
     * @remarks
     * This checker is asynchronous. Use `asyncParse` on parsers that contain it.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDP
     * 
     */
    static create(definition?: Partial<DataParserCheckerDefinitionFileExist>): DataParserCheckerFileExist;
}
export declare const checkerFileExist: typeof DataParserCheckerFileExist.create;
export {};
