import { SF } from "@duplojs/server-utils";

const result = await SF.setMode("/tmp/file.txt", 0o644);
// result: E.Ok | SF.FileSystemLeft<"set-mode">

await SF.setMode("/tmp/file.txt", {
	user: {
		read: true,
		write: true,
	},
});
