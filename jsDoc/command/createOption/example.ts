import { SC } from "@scripts";
import { DP } from "@duplojs/utils";

const port = SC.createOption("port", DP.string());

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

SC.create(
	"serve",
	{
		options: [port, name, mode],
	},
	({ options: { port, name, mode } }) => {
		// port: string | undefined
		// name: string
		// mode: "dev" | "prod" | undefined
	},
);
