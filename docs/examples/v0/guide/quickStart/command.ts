import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		description: "Greet someone",
		options: [SC.createBooleanOption("shout", { aliases: ["s"] })],
		subject: DP.string(),
	},
	({ options, subject }) => {
		const message = `hello ${subject}`;

		console.log(options.shout ? message.toUpperCase() : message);
	},
);
