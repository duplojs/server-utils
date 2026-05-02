import { SC } from "@server-utils/v0";

await SC.exec(
	{
		options: [
			SC.createBooleanOption(
				"verbose",
				{ aliases: ["v"] },
			),
		],
	},
	({ options }) => {
		if (options.verbose) {
			console.log("Verbose output enabled");
		}
	},
);
