import { SC } from "@scripts";
import { C, DP } from "@duplojs/utils";

const ids = SC.createArrayOption(
	"ids",
	DP.number(),
	{
		required: true,
		min: 1,
	},
);

const paths = SC.createArrayOption(
	"paths",
	DP.string(),
	{ separator: ";" },
);

const UserId = C.createNewType("user-id", DP.number(), C.Positive);
const userIds = SC.createArrayOption("userIds", UserId);

const tags = SC.createArrayOption("tags", DP.string());
const emails = SC.createArrayOption("emails", C.Email);

SC.create(
	"batch",
	{
		options: [tags, ids, paths, emails, userIds],
	},
	({ options: { ids, tags, paths, emails, userIds } }) => {
		// ids: [number, ...number[]]
		// tags: string[] | undefined
		// paths: string[] | undefined
		// emails: C.Email[] | undefined
		// userIds: C.GetNewType<typeof UserId>[] | undefined
	},
);
