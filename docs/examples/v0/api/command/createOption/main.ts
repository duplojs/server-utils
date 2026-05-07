import { SC } from "@server-utils/v0";
import { C, DP } from "@duplojs/utils";

const UserId = C.createNewType("user-id", DP.number(), C.Positive);

await SC.exec({
	options: [
		SC.createOption("host", DP.string()),
		SC.createOption(
			"port",
			DP.number(),
			{ required: true },
		),
		SC.createOption(
			"environment",
			DP.literal(["dev", "prod"]),
		),
		SC.createOption("email", C.Email),
		SC.createOption("userId", UserId),
	],
}, ({ options }) => {
	//    ^?









});
