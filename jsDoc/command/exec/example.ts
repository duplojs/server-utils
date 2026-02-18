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
		subject: DP.tuple([DP.string()]),
	},
	({ subject }) => {
		if (subject) {
			const [taskName] = subject;
			// taskName: string
		}
	},
);
