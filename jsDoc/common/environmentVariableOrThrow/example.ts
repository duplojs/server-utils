import { DP } from "@duplojs/utils";
import { EnvironmentVariableError, environmentVariableOrThrow } from "@scripts";

const fromRuntime = await environmentVariableOrThrow({
	APP_NAME: DP.string(),
});
// { APP_NAME: string }

const fromFiles = await environmentVariableOrThrow(
	{
		APP_NAME: DP.string(),
		API_URL: DP.string(),
		PORT: DP.coerce.number(),
	},
	{
		paths: [".env", ".env.local"],
		override: true,
		justRead: true,
	},
);
// { APP_NAME: string; API_URL: string; PORT: number;}

try {
	await environmentVariableOrThrow(
		{
			PORT: DP.number(), // not a number (add coerce)
		},
		{
			paths: [".env"],
		},
	);
} catch (error) {
	if (error instanceof EnvironmentVariableError) {
		// Handle env file read error or schema parsing error.
	}
}
