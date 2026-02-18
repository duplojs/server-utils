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

await SC.exec(
	{
		subject: [
			SC.create(
				"doctor",
				() => {
					console.log("all checks are green");
				},
			),
		],
	},
	() => {
		console.log("run with a sub-command");
	},
);
