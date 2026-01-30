import { getCurrentWorkDirectoryOrThrow, setCurrentWorkingDirectory } from "@scripts";

const cwd = getCurrentWorkDirectoryOrThrow();
// cwd: string

setCurrentWorkingDirectory("/tmp");
const after = getCurrentWorkDirectoryOrThrow();
// after: string

const path = getCurrentWorkDirectoryOrThrow();
// path: string
