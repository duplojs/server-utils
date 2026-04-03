import { SetCurrentWorkingDirectoryError, getCurrentWorkDirectoryOrThrow, setCurrentWorkingDirectoryOrThrow } from "@scripts";

setCurrentWorkingDirectoryOrThrow("/tmp/project");
const firstPath = getCurrentWorkDirectoryOrThrow();
// firstPath: string ("/tmp/project")

const nextPath = "/tmp/another-project";
setCurrentWorkingDirectoryOrThrow(nextPath);
const secondPath = getCurrentWorkDirectoryOrThrow();
// secondPath: string ("/tmp/another-project")

try {
	setCurrentWorkingDirectoryOrThrow("/tmp/missing-project");
} catch (error) {
	if (error instanceof SetCurrentWorkingDirectoryError) {
		// Handle the inability to change the current working directory.
	}
}
