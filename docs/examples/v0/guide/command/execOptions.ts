import { SC } from "@server-utils/v0";
import { DP } from "@duplojs/utils";

const options = await SC.execOptions(
	SC.createOption(
		"port",
		DP.coerce.number(),
		{
			required: true,
			description: "HTTP port",
		},
	),
	SC.createBooleanOption(
		"reload",
		{
			aliases: ["r"],
			description: "Restart on file change",
		},
	),
);

if (options.reload) {
	console.log(`server listens on ${options.port} with reload`);
}
