import { setCurrentWorkingDirectory } from "@duplojs/server-utils";
import { E } from "@duplojs/utils";

const result = setCurrentWorkingDirectory("/tmp/project");
// result: E.Fail | E.Ok

if (E.isRight(result)) {
	// the action was successful
}
