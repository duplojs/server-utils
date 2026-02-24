import type { DP, SimplifyTopLevel } from "@duplojs/utils";
export type EligibleDataParser = (DP.DataParserString | DP.DataParserNumber<SimplifyTopLevel<Omit<DP.DataParserDefinitionNumber, "coerce"> & {
    readonly coerce: true;
}>> | DP.DataParserBigInt<SimplifyTopLevel<Omit<DP.DataParserDefinitionBigInt, "coerce"> & {
    readonly coerce: true;
}>> | DP.DataParserDate<SimplifyTopLevel<Omit<DP.DataParserDefinitionDate, "coerce"> & {
    readonly coerce: true;
}>> | DP.DataParserTime<SimplifyTopLevel<Omit<DP.DataParserDefinitionTime, "coerce"> & {
    readonly coerce: true;
}>> | DP.DataParserLiteral<SimplifyTopLevel<Omit<DP.DataParserDefinitionLiteral, "value"> & {
    readonly value: readonly string[];
}>> | DP.DataParserNil<SimplifyTopLevel<Omit<DP.DataParserDefinitionNil, "coerce"> & {
    readonly coerce: true;
}>> | DP.DataParserTemplateLiteral | DP.DataParserUnion<SimplifyTopLevel<Omit<DP.DataParserDefinitionUnion, "options"> & {
    readonly options: readonly [
        EligibleDataParser,
        ...EligibleDataParser[]
    ];
}>> | DP.DataParserTransform<SimplifyTopLevel<Omit<DP.DataParserDefinitionTransform, "inner"> & {
    readonly inner: EligibleDataParser;
}>> | DP.DataParserPipe<SimplifyTopLevel<Omit<DP.DataParserDefinitionPipe, "input" | "output"> & {
    readonly input: EligibleDataParser;
    readonly output: EligibleDataParser;
}>> | DP.DataParserOptional<SimplifyTopLevel<Omit<DP.DataParserDefinitionOptional, "inner"> & {
    readonly inner: EligibleDataParser;
}>>);
