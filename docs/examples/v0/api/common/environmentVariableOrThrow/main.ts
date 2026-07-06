import { environmentVariableOrThrow } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

const parsedVariables = await environmentVariableOrThrow(
	{
		APPLICATION_NAME: DP.string(),
		APPLICATION_PORT: DP.number(),
	},
	{
		includedFiles: [".env"],
		override: false,
		justRead: true,
	},
);
// parsedVariables: { APPLICATION_NAME: string; APPLICATION_PORT: number }
