import { SC } from "@duplojs/server-utils";
import { C, DP, type ExpectType } from "@duplojs/utils";

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
	type check = ExpectType<
		typeof options,
		{
			tags: string[] | undefined;
			files: [string, ...string[]];
			emails: C.Email[] | undefined;
			userIds: C.GetNewType<typeof UserId>[] | undefined;
		},
		"strict"
	>;
});
