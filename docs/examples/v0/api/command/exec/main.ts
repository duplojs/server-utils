import { DP } from "@duplojs/utils";
import { SC } from "@server-utils/v0";

await SC.exec(
	{
		options: [SC.createBooleanOption("version")],
		subjects: [
			SC.createArgument("sourcePath", DP.string()),
			SC.createArgument("targetPath", DP.string()),
		],
	},
	({ args, options }) => {
		if (options.version) {
			console.log("1.0.0");
			return;
		}

		const { sourcePath, targetPath } = args;
		console.log(`copy ${sourcePath} to ${targetPath}`);
	},
);

// Try with:
// cpCli file.txt file-copy.txt
// output: copy file.txt to file-copy.txt
// Other:
// cpCli --version
// output: 1.0.0
