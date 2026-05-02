import { environmentVariable } from "@server-utils/v0";
import { DP, E, unwrap } from "@duplojs/utils";

const result = await environmentVariable(
	{
		NODE_ENV: DP.literal(["development", "production", "test"]),
		PORT: DP.coerce.number(),
		DATABASE_URL: DP.string(),
	},
	{
		paths: [".env", ".env.local"],
	},
);

if (E.isRight(result)) {
	const env = unwrap(result);
	console.log(env.PORT);
}
