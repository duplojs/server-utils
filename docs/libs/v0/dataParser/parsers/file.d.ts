import { type BytesInString, type FixDeepFunctionInfer, type Kind, type NeverCoalescing, type AnyTuple } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import type * as OO from "@duplojs/utils/object";
import { type FileInterface } from "../../file";
export interface DataParserFileCheckerCustom {
}
export type DataParserFileCheckers = (DataParserFileCheckerCustom[OO.GetPropsWithValueExtends<DataParserFileCheckerCustom, DDP.DataParserChecker>] | DDP.CheckerRefineImplementation<FileInterface>);
export interface DataParserDefinitionFile extends DDP.DataParserDefinition<DataParserFileCheckers> {
    readonly coerce: boolean;
    readonly mimeType?: RegExp;
    readonly minSize?: number;
    readonly maxSize?: number;
    readonly checkExist: boolean;
}
export declare const fileKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtilsDataParser/file", unknown>>;
type _DataParserFile<GenericDefinition extends DataParserDefinitionFile> = (DDP.DataParser<GenericDefinition, FileInterface, FileInterface> & Kind<typeof fileKind.definition>);
export interface DataParserFile<GenericDefinition extends DataParserDefinitionFile = DataParserDefinitionFile> extends _DataParserFile<GenericDefinition> {
    addChecker<GenericChecker extends readonly [
        DataParserFileCheckers,
        ...DataParserFileCheckers[]
    ]>(...args: FixDeepFunctionInfer<readonly [
        DataParserFileCheckers,
        ...DataParserFileCheckers[]
    ], GenericChecker>): DataParserFile<DDP.AddCheckersToDefinition<GenericDefinition, GenericChecker>>;
}
export interface DataParserFileParams {
    readonly mimeType?: string | AnyTuple<string> | RegExp;
    readonly minSize?: number | BytesInString;
    readonly maxSize?: number | BytesInString;
    readonly checkExist?: boolean;
}
/**
 * Build a file parser.
 * 
 * This parser validates that the input is a `FileInterface` (or coerces from a path when configured). It can also validate mime type, existence, and size constraints.
 * 
 * ```ts
 * const maybeFile: SF.FileInterface | undefined = SF.createFileInterface("path/file.txt");
 * 
 * const basic = SDP.file({
 * 	mimeType: "application/json",
 * });
 * basic.parse(maybeFile);
 * // Error<DataParserError> | Success<SF.FileInterface>
 * 
 * const withCoerce = SDP.coerce.file();
 * withCoerce.parse("/path/readme.md");
 * // Error<DataParserError> | Success<SF.FileInterface>
 * 
 * const withAsyncChecks = SDP.coerce.file({
 * 	checkExist: true,
 * 	maxSize: "2mb",
 * });
 * await withAsyncChecks.asyncParse("/path/picture.png");
 * // Promise<Error<DataParserError> | Success<SF.FileInterface>>
 * ```
 * 
 * @remarks
 * `parse` returns `E.Either` directly for synchronous checks.  
 * `asyncParse` returns `Promise<E.Either>` and is required for `checkExist`, `minSize`, and `maxSize`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
 * @namespace SDP
 * 
 */
export declare function file<const GenericDefinition extends Omit<Partial<DataParserDefinitionFile>, "mimeType" | "minSize" | "maxSize" | "checkExist"> = never>(params?: DataParserFileParams, definition?: GenericDefinition): DataParserFile<DDP.MergeDefinition<DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}>>>;
export declare namespace file {
    var overrideHandler: import("@duplojs/utils").OverrideHandler<DataParserFile<DataParserDefinitionFile>>;
}
export {};
