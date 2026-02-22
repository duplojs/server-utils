import { SC } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		subject: DP.tuple([DP.string(), DP.string()]),
	},
	({ subject }) => {
		if (!subject) {
			return;
		}

		const [sourcePath, targetPath] = subject;
		console.log(`copy ${sourcePath} to ${targetPath}`);
	},
);

// Try with:
// cpCli file.txt file-copy.txt
// output: copy file.txt to file-copy.txt
