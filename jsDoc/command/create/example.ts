import { SC } from "@scripts";
import { DP } from "@duplojs/utils";

const ping = SC.create(
	"ping",
	() => {
		// run ping action
	},
);

const greet = SC.create(
	"greet",
	{
		options: [SC.createOption("name", DP.string(), { required: true })],
	},
	({ options: { name } }) => {
		// name: string
	},
);

const projectCreate = SC.create(
	"create",
	() => {
		// create project
	},
);

const project = SC.create(
	"project",
	{
		subject: [projectCreate],
	},
	() => {
		// parent command fallback
	},
);
