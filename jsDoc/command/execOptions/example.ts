import { SC } from "@scripts";
import { DP } from "@duplojs/utils";

const portOption = SC.createOption(
	"port",
	DP.coerce.number(),
	{
		description: "HTTP port",
		required: true,
	},
);
const portResult = SC.execOptions(portOption);
// portResult.port: number

const tagOption = SC.createArrayOption(
	"tag",
	DP.string(),
	{
		aliases: ["t"],
		required: true,
	},
);
const forceOption = SC.createBooleanOption("force");

const options = SC.execOptions(tagOption, forceOption);
// options.tag: string[] | undefined
