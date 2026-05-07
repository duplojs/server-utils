import { SC } from "@scripts";
import { C, DP } from "@duplojs/utils";

const source = SC.createArgument("source", DP.string());
const target = SC.createArgument(
	"target",
	DP.string(),
	{
		optional: true,
		description: "Optional output file path",
	},
);

SC.create(
	"copy",
	{
		subjects: [source, target],
	},
	({ args }) => {
		// args.source: string
		// args.target: string | undefined
	},
);

const UserId = C.createNewType("user-id", DP.number(), C.Positive);
const userId = SC.createArgument("userId", UserId);

await SC.exec(
	{
		subjects: [userId],
	},
	({ args }) => {
		// args.userId: C.GetNewType<typeof UserId>
	},
);
