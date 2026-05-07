import { SC } from "@server-utils/v0";
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
	//    ^?






});
