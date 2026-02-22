import { SC } from "@duplojs/server-utils";

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
