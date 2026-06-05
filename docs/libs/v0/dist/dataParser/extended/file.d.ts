import { type AnyTuple, type FixDeepFunctionInfer, type NeverCoalescing } from "@duplojs/utils";
import * as DDataParser from "@duplojs/utils/dataParser";
import * as dataParsers from "../parsers";
declare const DataParserFileExtended_base: DDataParser.DataParserExtendedBaseInit<typeof dataParsers.DataParserFile>;
export declare class DataParserFileExtended<GenericDefinition extends dataParsers.DataParserDefinitionFile = dataParsers.DataParserDefinitionFile> extends DataParserFileExtended_base<GenericDefinition, DDataParser.Output<dataParsers.DataParserFile<GenericDefinition>>, DDataParser.Input<dataParsers.DataParserFile<GenericDefinition>>> {
    get classConstructor(): typeof DataParserFileExtended & DDataParser.CheckedConstructorKind;
    addChecker: <GenericChecker extends readonly [
        DDataParser.DataParserChecker<DDataParser.Output<this>>,
        ...DDataParser.DataParserChecker<DDataParser.Output<this>>[]
    ]>(...args: FixDeepFunctionInfer<readonly [
        DDataParser.DataParserChecker<DDataParser.Output<this>>,
        ...DDataParser.DataParserChecker<DDataParser.Output<this>>[]
    ], GenericChecker>) => DataParserFileExtended<DDataParser.AddCheckersToDefinition<GenericDefinition, GenericChecker>>;
    refine: (theFunction: (input: DDataParser.Output<this>) => boolean, definition?: Partial<Omit<DDataParser.DataParserCheckerDefinitionRefine, "theFunction">>) => DataParserFileExtended<DDataParser.AddCheckersToDefinition<GenericDefinition, readonly [DDataParser.CheckerRefineImplementation<DDataParser.Output<this>>]>>;
    /**
     * Adds a file-size checker to an extended file parser.
     * 
     * The method returns a new parser that enforces optional minimum and maximum sizes. Limits can be expressed as bytes with numbers or as byte strings such as `"10kb"`, `"2mb"`, or `"1.5gb"`.
     * 
     * ```ts
     * const maximumSizeParser = SDPE.file()
     * 	.size({ max: "2mb" });
     * await maximumSizeParser.asyncParse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * 
     * const rangedSizeParser = SDPE.file()
     * 	.size({
     * 		min: "10kb",
     * 		max: "2mb",
     * 	});
     * await rangedSizeParser.asyncParse(
     * 	SF.createFileInterface("/path/archive.zip"),
     * );
     * 
     * const coerceParser = SDPE.coerce.file()
     * 	.size({ min: 1 });
     * await coerceParser.asyncParse("/path/document.pdf");
     * ```
     * 
     * @remarks
     * This method adds an asynchronous checker and rejects missing resources or resources that are not regular files. Use `asyncParse` on the returned parser.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDPE
     * 
     */
    size(input: dataParsers.DataParserCheckerFileSizeInput, definition?: Partial<Omit<dataParsers.DataParserCheckerDefinitionFileSize, "min" | "max">>): DataParserFileExtended<DDataParser.AddCheckersToDefinition<GenericDefinition, readonly [dataParsers.DataParserCheckerFileSize]>>;
    /**
     * Adds an existing-file checker to an extended file parser.
     * 
     * The method returns a new parser that rejects missing resources and resources that are not regular files.
     * 
     * ```ts
     * const parser = SDPE.file().exist();
     * await parser.asyncParse(
     * 	SF.createFileInterface("/path/document.pdf"),
     * );
     * 
     * const coerceParser = SDPE.coerce.file().exist();
     * await coerceParser.asyncParse("/path/picture.png");
     * 
     * const existingImageParser = SDPE.file()
     * 	.mimeType(/^image\//)
     * 	.exist();
     * await existingImageParser.asyncParse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * ```
     * 
     * @remarks
     * This method adds an asynchronous checker. Use `asyncParse` on the returned parser.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDPE
     * 
     */
    exist(definition?: Partial<dataParsers.DataParserCheckerDefinitionFileExist>): DataParserFileExtended<DDataParser.AddCheckersToDefinition<GenericDefinition, readonly [dataParsers.DataParserCheckerFileExist]>>;
    /**
     * Adds a MIME-type checker to an extended file parser.
     * 
     * The method returns a new parser that tests the MIME type inferred from the file extension against the provided input. A regular expression is used as-is, while a string or string tuple is converted to an exact-match regular expression.
     * 
     * ```ts
     * const imageParser = SDPE.file()
     * 	.mimeType(/^image\//);
     * imageParser.parse(
     * 	SF.createFileInterface("/path/picture.png"),
     * );
     * 
     * const documentParser = SDPE.file()
     * 	.mimeType(["application/pdf", "text/plain"]);
     * documentParser.parse(
     * 	SF.createFileInterface("/path/document.pdf"),
     * );
     * 
     * const existingJsonParser = SDPE.file()
     * 	.mimeType("application/json")
     * 	.exist();
     * await existingJsonParser.asyncParse(
     * 	SF.createFileInterface("/path/config.json"),
     * );
     * ```
     * 
     * @remarks
     * String inputs are useful for strict MIME-type checks, and tuple inputs allow several strict values without writing an alternation regex. When no MIME type can be inferred, the resolved regular expression is tested against an empty string.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDPE
     * 
     */
    mimeType(mimeType: RegExp | string | AnyTuple<string>, definition?: Partial<Omit<dataParsers.DataParserCheckerDefinitionFileMimeType, "mimeType">>): DataParserFileExtended<DDataParser.AddCheckersToDefinition<GenericDefinition, readonly [dataParsers.DataParserCheckerFileMimeType]>>;
    /**
     * Creates an extended data parser for `FileInterface` values.
     * 
     * The parser exposes the chainable `mimeType`, `size`, and `exist` methods to compose file-specific constraints.
     * 
     * ```ts
     * const fileInterface = SF.createFileInterface("path/file.txt");
     * 
     * const mimeTypeParser = SDPE.file()
     * 	.mimeType(/^image\/(?:png|jpeg)$/);
     * mimeTypeParser.parse(fileInterface);
     * // Error<DataParserError> | Success<SF.FileInterface>
     * 
     * const sizeParser = SDPE.file()
     * 	.size({
     * 		min: 10_000,
     * 		max: 2_000_000,
     * 	});
     * await sizeParser.asyncParse(fileInterface);
     * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
     * 
     * const existingImageParser = SDPE.coerce.file()
     * 	.mimeType(/^image\//)
     * 	.exist();
     * await existingImageParser.asyncParse("/path/picture.png");
     * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
     * ```
     * 
     * @remarks
     * Use `asyncParse` after adding `size` or `exist`, because these methods add asynchronous checkers.
     * 
     * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
     * @namespace SDPE
     * 
     */
    static create<const GenericDefinition extends DDataParser.PrepareDataParserDefinition<dataParsers.DataParserDefinitionFile> = never>(definition?: FixDeepFunctionInfer<DDataParser.PrepareDataParserDefinition<dataParsers.DataParserDefinitionFile>, GenericDefinition>): DataParserFileExtended<DDataParser.MergeDefinition<dataParsers.DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}>>>;
}
export declare const file: typeof DataParserFileExtended.create;
export {};
