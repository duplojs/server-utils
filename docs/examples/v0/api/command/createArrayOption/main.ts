import { SC } from "@server-utils/v0";
import { C, DP } from "@duplojs/utils";

const UserId = C.createNewType("user-id", DP.number(), C.Positive);

await SC.exec({
	options: [
		SC.createArrayOption(
			"tags",
			DP.string(),
		),
		SC.createArrayOption(
			"files",
			DP.string(),
			{
				required: true,
				min: 1,
				separator: ";",
			},
		),
		SC.createArrayOption("emails", C.Email),
		SC.createArrayOption("userIds", UserId),
	],
}, ({ options }) => {
	//    ^?









});
