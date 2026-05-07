import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		description: "Greet someone",
		options: [SC.createBooleanOption("shout", { aliases: ["s"] })],
		subjects: [SC.createArgument("name", DP.string())],
	},
	({ options, args: { name } }) => {
		const message = `hello ${name}`;

		console.log(options.shout ? message.toUpperCase() : message);
	},
);
