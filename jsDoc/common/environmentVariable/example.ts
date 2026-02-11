import { DP } from "@duplojs/utils";
import { environmentVariable } from "@scripts";

const fromRuntime = await environmentVariable({
	APP_NAME: DP.string(),
});
// Success<{ APP_NAME: string }> | Left<...> | L..

const fromFiles = await environmentVariable(
	{
		APP_NAME: DP.string(),
		API_URL: DP.string(),
		PORT: DP.coerce.number(),
	},
	{
		paths: [".env", ".env.local"],
		override: true,
		justRead: true, // not override runtime env
	},
);
// Success<{ APP_NAME: string; API_URL: string; PORT: number;}> |  Left<...> | L..

await environmentVariable(
	{
		APP_NAME: DP.string(),
	},
	{
		override: false,
		justRead: false,
	},
);
// Parse values and write resolved variables back to runtime env.
