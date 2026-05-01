import type * as DDP from "@duplojs/utils/dataParser";
import type { ComputeEligibleCleanType, EligibleCleanType, EligibleContract } from "../../types";

export type ComputeOptionContract<
	GenericContract extends EligibleContract,
> = [GenericContract] extends [DDP.DataParser]
	? DDP.Output<GenericContract>
	: [GenericContract] extends [EligibleCleanType]
		? ComputeEligibleCleanType<GenericContract>
		: never;
