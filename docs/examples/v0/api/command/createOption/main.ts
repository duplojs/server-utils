import { SC } from "@duplojs/server-utils";
import { C, DP, type ExpectType } from "@duplojs/utils";

const UserId = C.createNewType("user-id", DP.number(), C.Positive);

const command = SC.create(
	"serve",
	{
		options: [
			SC.createOption("host", DP.string()),
			SC.createOption(
				"port",
				DP.number(),
				{ required: true },
			),
			SC.createOption(
				"environment",
				DP.literal(["dev", "prod"]),
			),
			SC.createOption("email", C.Email),
			SC.createOption("userId", UserId),
		],
	},
	({ options }) => {
		type check = ExpectType<
			typeof options,
			{
				host: string | undefined;
				port: number;
				environment: "dev" | "prod" | undefined;
				email: C.Email | undefined;
				userId: C.GetNewType<typeof UserId> | undefined;
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
	"--email=dev@duplojs.dev",
	"--userId=42",
]);
