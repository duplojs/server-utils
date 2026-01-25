import { SF } from "@scripts";

const result = await SF.setMode("/tmp/file.txt", 0o644);
// result: EitherOk | EitherFail

await SF.setMode("/tmp/file.txt", {
	user: {
		read: true,
		write: true,
	},
});
