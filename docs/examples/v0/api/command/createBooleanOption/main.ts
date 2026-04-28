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

await SC.exec({
	options: [verboseOption, forceOption],
}, ({ options }) => {
	type check = ExpectType<
		typeof options,
		{
			verbose: boolean;
			force: boolean;
		},
		"strict"
	>;
});
