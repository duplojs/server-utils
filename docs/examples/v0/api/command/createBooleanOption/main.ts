import { SC } from "@duplojs/server-utils";
import { type ExpectType } from "@duplojs/utils";

const verboseOption = SC.createBooleanOption(
	"verbose",
	{
		aliases: ["v"],
		description: "Print additional details",
	},
);

const forceOption = SC.createBooleanOption("force");

const command = SC.create(
	"cleanup",
	{
		options: [verboseOption, forceOption],
	},
	({ options }) => {
		type check = ExpectType<
			typeof options,
			{
				verbose: boolean;
				force: boolean;
			},
			"strict"
		>;
	},
);

await command.execute(["--verbose", "--force"]);
