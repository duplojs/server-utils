import { environmentVariableOrThrow } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

const parsedVariables = await environmentVariableOrThrow(
	{
		APPLICATION_NAME: DP.string(),
		APPLICATION_PORT: DP.number(),
	},
	{
		paths: [".env"],
		override: false,
		justRead: true,
	},
);
// parsedVariables: { APPLICATION_NAME: string; APPLICATION_PORT: number }
