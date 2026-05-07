import { SC } from "@scripts";
import { DP } from "@duplojs/utils";

await SC.exec(() => {
	// called for an empty root command
});

await SC.exec(
	{
		options: [SC.createBooleanOption("verbose", { aliases: ["v"] })],
	},
	({ options: { verbose } }) => {
		if (verbose) {
			// verbose mode
		}
	},
);

await SC.exec(
	{
		subjects: [SC.createArgument("taskName", DP.string())],
	},
	({ args }) => {
		const { taskName } = args;
		// taskName: string
	},
);
