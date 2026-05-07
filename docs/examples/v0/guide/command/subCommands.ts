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
		subjects: [SC.createArgument("packageName", DP.string())],
	},
	({ options, args: { packageName } }) => {
		console.log(`install ${packageName}${options.yes ? " without prompt" : ""}`);
	},
);

await SC.exec(
	{
		description: "Package manager",
		subjects: [installCommand],
	},
	() => {
		console.log("select a package command");
	},
);
