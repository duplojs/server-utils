import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

const installCommand = SC.create(
	"install",
	{
		description: "Install a package",
		options: [
			SC.createBooleanOption(
				"yes",
				{
					aliases: ["y"],
					description: "Answer yes to prompts",
				},
			),
		],
		subject: DP.string(),
	},
	({ options, subject }) => {
		console.log(`install ${subject}${options.yes ? " without prompt" : ""}`);
	},
);

await SC.exec(
	{
		description: "Package manager",
		subject: [installCommand],
	},
	() => {
		console.log("select a package command");
	},
);
