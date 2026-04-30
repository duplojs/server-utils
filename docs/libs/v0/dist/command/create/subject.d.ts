import { type AnyTuple, type SimplifyTopLevel } from "@duplojs/utils";
import * as DDP from "@duplojs/utils/dataParser";
import type { ComputeEligibleCleanType, EligibleCleanType, EligibleDataParser } from "../types";
export type Subject = (EligibleDataParser | DDP.DataParserArray<SimplifyTopLevel<Omit<DDP.DataParserDefinitionArray, "element"> & {
    readonly element: EligibleDataParser;
}>> | DDP.AdvancedContract<DDP.DataParserTuple<SimplifyTopLevel<Omit<DDP.DataParserDefinitionTuple, "shape" | "rest"> & {
    readonly shape: readonly [
        EligibleDataParser,
        ...EligibleDataParser[]
    ];
    readonly rest: EligibleDataParser | undefined;
}>>> | EligibleCleanType | AnyTuple<EligibleCleanType | EligibleDataParser>);
export type ComputeSubject<GenericSubject extends Subject> = [GenericSubject] extends [DDP.DataParser] ? DDP.Output<GenericSubject> : [GenericSubject] extends [EligibleCleanType] ? ComputeEligibleCleanType<GenericSubject> : [GenericSubject] extends [AnyTuple<EligibleCleanType | EligibleDataParser>] ? {
    [GenericKey in keyof GenericSubject]: GenericSubject[GenericKey] extends EligibleCleanType | EligibleDataParser ? ComputeSubject<GenericSubject[GenericKey]> : never;
} : never;
export declare function subjectToDataParser(contract: Subject): DDP.DataParser;
export declare function isMultiSubject(subject: Subject): boolean;
