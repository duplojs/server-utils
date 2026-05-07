import { SC } from "@server-utils/v0";
import { DP, type ExpectType } from "@duplojs/utils";

const deployCommand = SC.create(
	"deploy",
	{
		description: "Deploy the current release",
		options: [
			SC.createOption(
				"environment",
				DP.literal(["staging", "prod"]),
				{ required: true },
			),
		],
		subjects: [
			SC.createArgument(
				"version",
				DP.union([
					DP.templateLiteral([
						"v",
						DP.number(),
						".",
						DP.number(),
						".",
						DP.number(),
					]),
					DP.literal("latest"),
				]),
			),
		],
	},
	({ options: { environment }, args: { version } }) => {
		type check = ExpectType<
			typeof version,
			`v${number}.${number}.${number}` | "latest",
			"strict"
		>;
		type checkOption = ExpectType<
			typeof environment,
			"staging" | "prod",
			"strict"
		>;
	},
);

const releaseCommand = SC.create(
	"release",
	{
		subjects: [deployCommand],
	},
	() => {
		console.log("select a release sub-command");
	},
);
