import * as DDataParser from "@duplojs/utils/dataParser";
import type * as DServerFile from "../../../../file";
export interface DataParserCheckerDefinitionFileMimeType extends DDataParser.DataParserCheckerDefinition {
    mimeType: RegExp;
}
export declare const checkerFileMimeTypeKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-mime-type", unknown>>;
declare const DataParserCheckerFileMimeType_base: DDataParser.DataParserCheckerBaseInit<import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/checker-file-mime-type", unknown>>>;
export declare class DataParserCheckerFileMimeType extends DataParserCheckerFileMimeType_base<DataParserCheckerDefinitionFileMimeType, DServerFile.FileInterface> {
    get classConstructor(): typeof DataParserCheckerFileMimeType & DDataParser.CheckedConstructorKind;
    isAsynchronous(): boolean;
    static execCheck(value: DServerFile.FileInterface, error: DDataParser.DataParserError, self: DataParserCheckerFileMimeType, dataParser: DDataParser.DataParser): DServerFile.FileInterface | typeof DDataParser.SymbolDataParserError;
    /**
     * Creates a checker that validates a file MIME type.
     * 
     * The checker tests the MIME type inferred from the file extension against the provided regular expression.
     * 
     * ```ts
     * const imageParser = SDP.file({
     * 	checkers: [SDP.checkerFileMimeType(/^image\//)],
     * });
     * imageParser.parse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * 
     * const documentParser = SDP.file({
     * 	checkers: [SDP.checkerFileMimeType(/^(?:application\/pdf|text\/plain)$/)],
     * });
     * documentParser.parse(
     * 	SF.createFileInterface("/path/document.pdf"),
     * );
     * 
     * SDP.file()
     * 	.addChecker(SDP.checkerFileMimeType(/^application\/json$/))
     * 	.parse(SF.createFileInterface("/path/config.json"));
     * ```
     * 
     * @remarks
     * When no MIME type can be inferred, the regular expression is tested against an empty string.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDP
     * 
     */
    static create(mimeType: RegExp, definition?: Partial<Omit<DataParserCheckerDefinitionFileMimeType, "mimeType">>): DataParserCheckerFileMimeType;
}
export declare const checkerFileMimeType: typeof DataParserCheckerFileMimeType.create;
export {};
