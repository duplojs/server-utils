import { environmentVariable } from "@server-utils/v0";
import { DP, E, unwrap } from "@duplojs/utils";

const firstResult = await environmentVariable({
	APPLICATION_NAME: DP.string(),
});
// firstResult: E.Success<{ APPLICATION_NAME: string }> | E.Left<unknown>

if (E.isRight(firstResult)) {
	const parsedVariables = unwrap(firstResult);
	// parsedVariables.APPLICATION_NAME: string
}

const secondResult = await environmentVariable(
	{
		APPLICATION_NAME: DP.string(),
		API_URL: DP.string(),
	},
	{
		includedFiles: [".env", ".env.local"],
		override: true,
		justRead: true,
	},
);
// secondResult: E.Success<{ APPLICATION_NAME: string; API_URL: string }> | E.Left<unknown>
