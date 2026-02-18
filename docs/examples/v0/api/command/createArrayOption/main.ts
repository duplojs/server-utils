import { SC } from "@duplojs/server-utils";
import { DP, type ExpectType } from "@duplojs/utils";

const command = SC.create(
	"batch",
	{
		options: [
			SC.createArrayOption(
				"tags",
				DP.string(),
			),
			SC.createArrayOption(
				"files",
				DP.string(),
				{
					required: true,
					min: 1,
					separator: ";",
				},
			),
		],
	},
	({ options }) => {
		type check = ExpectType<
			typeof options,
			{
				tags: string[] | undefined;
				files: [string, ...string[]];
			},
			"strict"
		>;
	},
);

await command.execute([
	"--tags=api,docs",
	"--files=src/a.ts;src/b.ts",
]);
