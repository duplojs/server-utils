import * as dataParsers from "..";
import { type DP, type NeverCoalescing } from "@duplojs/utils";
export declare function file<const GenericDefinition extends Omit<Partial<dataParsers.DataParserDefinitionFile>, "mimeType" | "minSize" | "maxSize" | "coerce"> = never>(params?: dataParsers.DataParserFileParams, definition?: GenericDefinition): dataParsers.DataParserFile<DP.MergeDefinition<dataParsers.DataParserDefinitionFile, NeverCoalescing<GenericDefinition, {}> & {
    coerce: true;
}>>;
