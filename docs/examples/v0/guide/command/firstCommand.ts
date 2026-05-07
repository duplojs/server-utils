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
		subjects: [
			SC.createArgument("pattern", DP.string()),
			SC.createArgument("filePath", DP.string()),
		],
	},
	({ options, args: { pattern, filePath } }) => {
		const sensitivity = options["ignore-case"] ? "case-insensitive" : "case-sensitive";

		console.log(`search "${pattern}" in ${filePath} (${sensitivity})`);
	},
);
