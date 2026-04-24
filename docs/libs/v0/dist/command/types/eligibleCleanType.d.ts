import type { AnyTuple } from "@duplojs/utils";
import type * as CC from "@duplojs/utils/clean";
import type * as DD from "@duplojs/utils/date";
export type EligiblePrimitive = string | number | boolean | bigint | DD.TheDate | DD.TheTime;
export type EligibleEntityProperty = (CC.NewTypeHandler<any, EligiblePrimitive, readonly any[], any> | CC.EntityPropertyDefinitionUnion<AnyTuple<EligibleEntityProperty>> | CC.EntityPropertyDefinitionNullable<EligibleEntityProperty> | CC.EntityPropertyDefinitionArray<EligibleEntityProperty, CC.EntityPropertyDefinitionArrayParams> | CC.EntityPropertyDefinitionIdentifier<string>);
export type EligibleCleanType = (CC.ConstraintHandler | CC.ConstraintsSetHandler | CC.PrimitiveHandler | EligibleEntityProperty);
export type ComputeEligibleCleanType<GenericSubject extends EligibleCleanType> = [GenericSubject] extends [CC.ConstraintHandler<any, any, readonly any[], any>] ? CC.GetConstraint<GenericSubject> : [GenericSubject] extends [CC.ConstraintsSetHandler<any, readonly any[], any>] ? CC.GetConstraints<GenericSubject> : [GenericSubject] extends [CC.PrimitiveHandler] ? ReturnType<GenericSubject["createWithUnknownOrThrow"]> : [GenericSubject] extends [EligibleEntityProperty] ? CC.EntityProperty<GenericSubject> : never;
