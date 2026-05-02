import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		description: "Search text in a file",
		options: [
			SC.createBooleanOption(
				"ignore-case",
				{
					aliases: ["i"],
					description: "Ignore letter case",
				},
			),
		],
		subject: DP.tuple([DP.string(), DP.string()]),
	},
	({ options, subject }) => {
		const [pattern, filePath] = subject;
		const sensitivity = options["ignore-case"] ? "case-insensitive" : "case-sensitive";

		console.log(`search "${pattern}" in ${filePath} (${sensitivity})`);
	},
);
