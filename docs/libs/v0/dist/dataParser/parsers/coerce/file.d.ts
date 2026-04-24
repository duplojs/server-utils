import type { NeverCoalescing } from "@duplojs/utils";
import type * as DDP from "@duplojs/utils/dataParser";
import * as dataParsers from "../../parsers";
export declare function file<const GenericDefinition extends Omit<Partial<dataParsers.DataParserDefinitionFile>, "mimeType" | "minSize" | "maxSize" | "coerce"> = never>(params?: dataParsers.DataParserFileParams, definition?: GenericDefinition): dataParsers.DataParserFile<DDP.MergeDefinition<dataParsers.DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}> & {
    coerce: true;
}>>;
