import { setCurrentWorkingDirectory } from "@scripts";

setCurrentWorkingDirectory("/tmp/project");
// Either ok/fail.

setCurrentWorkingDirectory(new URL("file:///tmp/project"));
// Either ok/fail.

