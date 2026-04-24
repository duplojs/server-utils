import type { NeverCoalescing } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";
import type * as dataParsers from "../../parsers";
import * as dataParsersExtended from "..";
export declare function file<const GenericDefinition extends Omit<Partial<dataParsers.DataParserDefinitionFile>, "mimeType" | "minSize" | "maxSize" | "coerce"> = never>(params?: dataParsers.DataParserFileParams, definition?: GenericDefinition): dataParsersExtended.DataParserFileExtended<DDP.MergeDefinition<dataParsers.DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}> & {
    coerce: true;
}>>;
