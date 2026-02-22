import { SC } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

const migrateCommand = SC.create(
	"migrate",
	{
		description: "Run database migrations",
		options: [
			SC.createBooleanOption(
				"dryRun",
				{
					description: "Preview SQL statements without applying changes",
					aliases: ["dr"],
				},
			),
			SC.createOption(
				"environment",
				DP.literal(["dev", "staging", "prod"]),
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
	({ options: { dryRun, environment }, subject: targetVersion }) => {
		const mode = dryRun ? "preview" : "apply";

		console.log(
			`[${environment}] ${mode} migration to ${targetVersion}`,
		);
	},
);

const seedCommand = SC.create(
	"seed",
	{
		description: "Populate default data",
		options: [
			SC.createArrayOption(
				"tags",
				DP.string(),
				{ separator: "," },
			),
		],
	},
	({ options: { tags } }) => {
		console.log("seeding with tags:", tags ?? []);
	},
);

await SC.exec(
	{
		description: "Project CLI entrypoint",
		options: [SC.createBooleanOption("verbose", { aliases: ["v"] })],
		subject: [migrateCommand, seedCommand],
	},
	({ options }) => {
		if (options.verbose) {
			console.log("verbose mode enabled");
		}
	},
);

// Try with:
// cli migrate --environment=dev 2026-01-10
// cli seed --tags=users,roles
// cli --help
