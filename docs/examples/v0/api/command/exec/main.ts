import { SC } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		options: [SC.createBooleanOption("version")],
		subject: DP.tuple([DP.string(), DP.string()]),
	},
	({ subject, options }) => {
		if (options.version) {
			console.log("1.0.0");
			return;
		}

		const [sourcePath, targetPath] = subject;
		console.log(`copy ${sourcePath} to ${targetPath}`);
	},
);

// Try with:
// cpCli file.txt file-copy.txt
// output: copy file.txt to file-copy.txt
// Other:
// cpCli --version
// output: 1.0.0
