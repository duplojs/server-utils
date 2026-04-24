import { SC } from "@scripts";
import { C, DP } from "@duplojs/utils";

const name = SC.createOption(
	"name",
	DP.string(),
	{
		required: true,
		aliases: ["n"],
	},
);

const mode = SC.createOption(
	"mode",
	DP.literal(["dev", "prod"]),
);

const UserId = C.createNewType("user-id", DP.number(), C.Positive);
const userId = SC.createOption("userId", UserId);

const port = SC.createOption("port", DP.number());
const email = SC.createOption("email", C.Email);

SC.create(
	"serve",
	{
		options: [port, name, mode, email, userId],
	},
	({ options: { port, name, mode, email, userId } }) => {
		// port: number | undefined
		// name: string
		// mode: "dev" | "prod" | undefined
		// email: C.Email | undefined
		// userId: C.GetNewType<typeof UserId> | undefined
	},
);
