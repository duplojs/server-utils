import { setCurrentWorkingDirectory } from "@scripts";

setCurrentWorkingDirectory("/tmp/project");
// Either ok/fail.

setCurrentWorkingDirectory("/tmp/another-project");
// Either ok/fail.

const workingDirectory = "/tmp/third-project";
setCurrentWorkingDirectory(workingDirectory);
// Either ok/fail.
