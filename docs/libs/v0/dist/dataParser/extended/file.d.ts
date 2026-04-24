import { type AnyTuple, type BytesInString, type FixDeepFunctionInfer, type Kind, type NeverCoalescing } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import * as dataParsers from "../parsers";
import { type FileInterface } from "../../file";
type _DataParserFileExtended<GenericDefinition extends dataParsers.DataParserDefinitionFile> = (Kind<typeof dataParsers.fileKind.definition> & DDP.DataParserExtended<GenericDefinition, FileInterface, FileInterface>);
export interface DataParserFileExtended<GenericDefinition extends dataParsers.DataParserDefinitionFile = dataParsers.DataParserDefinitionFile> extends _DataParserFileExtended<GenericDefinition> {
    addChecker<GenericChecker extends readonly [
        dataParsers.DataParserFileCheckers,
        ...dataParsers.DataParserFileCheckers[]
    ]>(...args: FixDeepFunctionInfer<readonly [
        dataParsers.DataParserFileCheckers,
        ...dataParsers.DataParserFileCheckers[]
    ], GenericChecker>): DataParserFileExtended<DDP.AddCheckersToDefinition<GenericDefinition, GenericChecker>>;
    refine(theFunction: (input: DDP.Output<this>) => boolean, definition?: Partial<Omit<DDP.DataParserCheckerDefinitionRefine, "theFunction">>): DataParserFileExtended<DDP.AddCheckersToDefinition<GenericDefinition, readonly [DDP.CheckerRefineImplementation<DDP.Output<this>>]>>;
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
 * Build an extended file parser with chainable helpers.
 * 
 * This parser exposes fluent helpers such as `mimeType`, `minSize`, `maxSize`, and `mustExist` to compose constraints progressively.
 * 
 * ```ts
 * const maybeFile: SF.FileInterface | undefined = SF.createFileInterface("path/file.txt");
 * 
 * const byMimeType = SDPE.file()
 * 	.mimeType(["image/png", "image/jpeg"]);
 * byMimeType.parse(maybeFile);
 * // Error<DataParserError> | Success<SF.FileInterface>
 * 
 * const withMinAndMax = SDPE.coerce.file()
 * 	.minSize("10kb")
 * 	.maxSize("2mb");
 * await withMinAndMax.asyncParse("/path/archive.zip");
 * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
 * 
 * const mustExist = SDPE.coerce.file()
 * 	.mustExist();
 * await mustExist.asyncParse("/path/document.pdf");
 * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
 * ```
 * 
 * @remarks
 * Methods `minSize`, `maxSize`, and `mustExist` enable checks that require `asyncParse`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
 * @namespace SDPE
 * 
 */
export declare function file<const GenericDefinition extends Omit<Partial<dataParsers.DataParserDefinitionFile>, "mimeType" | "minSize" | "maxSize"> = never>(params?: dataParsers.DataParserFileParams, definition?: GenericDefinition): DataParserFileExtended<DDP.MergeDefinition<dataParsers.DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}>>>;
export declare namespace file {
    var overrideHandler: import("@duplojs/utils").OverrideHandler<DataParserFileExtended<dataParsers.DataParserDefinitionFile>>;
}
export {};
