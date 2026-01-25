import { getCurrentWorkDirectory, setCurrentWorkingDirectory } from "@scripts";

const cwd = getCurrentWorkDirectory();
// cwd is an Either with the current path.

setCurrentWorkingDirectory("/tmp");
const after = getCurrentWorkDirectory();
// after is an Either with the new path.
