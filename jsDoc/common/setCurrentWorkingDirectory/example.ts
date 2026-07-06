import { setCurrentWorkingDirectory } from "@scripts";

setCurrentWorkingDirectory("/tmp/project");
// E.Ok | E.Fail

setCurrentWorkingDirectory("/tmp/another-project");
// E.Ok | E.Fail

const workingDirectory = "/tmp/third-project";
setCurrentWorkingDirectory(workingDirectory);
// E.Ok | E.Fail
