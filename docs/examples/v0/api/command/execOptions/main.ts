import { SC } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

const portOption = SC.createOption(
	"port",
	DP.coerce.number(),
	{
		description: "HTTP port",
		required: true,
	},
);

const verboseOption = SC.createBooleanOption(
	"verbose",
	{
		aliases: ["v"],
		description: "Enable verbose logs",
	},
);

const options = SC.execOptions(portOption, verboseOption);
//       ^?






if (options.verbose) {
	console.log(`server starts on ${options.port}`);
}
