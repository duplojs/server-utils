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
		subjects: [SC.createArgument("userId", UserId)],
	},
	({ options: { email }, args: { userId } }) => {
		// email: C.Email | undefined
		// userId: C.GetNewType<typeof UserId>
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
		subjects: [projectCreate],
	},
	() => {
		// parent command fallback
	},
);
