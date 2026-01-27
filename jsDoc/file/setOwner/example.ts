import { SF } from "@scripts";

const result = await SF.setOwner("/tmp/file.txt", {
	userId: 1000,
	groupId: 1000,
});
// result: E.Ok | SF.FileSystemLeft

await SF.setOwner("/tmp/app.log", {
	userId: 0,
	groupId: 0,
});
