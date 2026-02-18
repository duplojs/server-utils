import { SC } from "@scripts";

const verbose = SC.createBooleanOption("verbose");

const force = SC.createBooleanOption(
	"force",
	{
		aliases: ["f"],
		description: "Force operation",
	},
);

SC.create(
	"deploy",
	{
		options: [verbose, force],
	},
	({ options: { verbose, force } }) => {
		// verbose: boolean
		// force: boolean
	},
);
