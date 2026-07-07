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
const portResult = await SC.execOptions(portOption);
// portResult.port: number
// CLI: tsx ./server.ts --port=3000

const tagOption = SC.createArrayOption(
	"tag",
	DP.string(),
	{
		aliases: ["t"],
		required: true,
	},
);
const forceOption = SC.createBooleanOption("force");

const options = await SC.execOptions(tagOption, forceOption);
// options.tag: string[] | undefined
// CLI: tsx ./batch.ts -t=api,worker --force
