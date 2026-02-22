import { SC } from "@duplojs/server-utils";
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
		subject: DP.union([
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
	},
	({ options: { environment }, subject }) => {
		type check = ExpectType<
			typeof subject,
			`v${number}.${number}.${number}` | "latest" | undefined,
			"strict"
		>;
	},
);

const releaseCommand = SC.create(
	"release",
	{
		subject: [deployCommand],
	},
	() => {
		console.log("select a release sub-command");
	},
);

