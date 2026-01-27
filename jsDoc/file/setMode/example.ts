import { SF } from "@scripts";

const result = await SF.setMode("/tmp/file.txt", 0o644);
// result: E.Ok | SF.FileSystemLeft

await SF.setMode("/tmp/file.txt", {
	user: {
		read: true,
		write: true,
	},
});
