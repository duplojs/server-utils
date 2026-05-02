import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		options: [
			SC.createOption(
				"type",
				DP.literal(["file", "directory"]),
				{
					required: true,
					aliases: ["t"],
					description: "Expected resource type",
				},
			),
			SC.createArrayOption(
				"name",
				DP.string(),
				{
					separator: ",",
					description: "Accepted resource names",
				},
			),
		],
	},
	({ options }) => {
		console.log(options.type);
		console.log(options.name ?? []);
	},
);
