import { setCurrentWorkingDirectory } from "@server-utils/v0";
import { E } from "@duplojs/utils";

const result = setCurrentWorkingDirectory("/tmp/project");
// result: E.Fail | E.Ok

if (E.isRight(result)) {
	// the action was successful
}
