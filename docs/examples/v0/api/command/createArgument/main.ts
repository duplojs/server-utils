import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

const sourceArgument = SC.createArgument(
	"source",
	DP.string(),
	{
		description: "Source file path",
	},
);

const targetArgument = SC.createArgument(
	"target",
	DP.string(),
	{
		description: "Target file path",
		optional: true,
	},
);

SC.create(
	"copy",
	{
		subjects: [sourceArgument, targetArgument],
	},
	({ args }) => {
		// ^?






		console.log("copy from", args.source, "to", args.target ?? "(stdout)");
	},
);
