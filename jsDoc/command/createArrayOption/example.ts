import { SC } from "@scripts";
import { DP } from "@duplojs/utils";

const tags = SC.createArrayOption("tags", DP.string());

const ids = SC.createArrayOption(
	"ids",
	DP.string(),
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

SC.create(
	"batch",
	{
		options: [tags, ids, paths],
	},
	({ options: { ids, tags, paths } }) => {
		// ids: [string, ...string[]]
		// tags: string[] | undefined
		// paths: string[] | undefined
	},
);
