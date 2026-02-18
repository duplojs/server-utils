import { SC } from "@duplojs/server-utils";
import { DP, type ExpectType } from "@duplojs/utils";

const command = SC.create(
	"serve",
	{
		options: [
			SC.createOption("host", DP.string()),
			SC.createOption(
				"port",
				DP.coerce.number(),
				{ required: true },
			),
			SC.createOption(
				"environment",
				DP.literal(["dev", "prod"]),
			),
		],
	},
	({ options }) => {
		type check = ExpectType<
			typeof options,
			{
				host: string | undefined;
				port: number;
				environment: "dev" | "prod" | undefined;
			},
			"strict"
		>;
	},
);

await command.execute([
	"--host",
	"0.0.0.0",
	"--port=8080",
	"--environment=prod",
]);
