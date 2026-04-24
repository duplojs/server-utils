import { SC } from "@scripts";
import { C, DP } from "@duplojs/utils";

const ping = SC.create(
	"ping",
	() => {
		// run ping action
	},
);

const UserId = C.createNewType("user-id", DP.number(), C.Positive);

const greet = SC.create(
	"greet",
	{
		options: [SC.createOption("email", C.Email)],
		subject: UserId,
	},
	({ options: { email }, subject }) => {
		// email: C.Email | undefined
		// subject: C.GetNewType<typeof UserId>
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
