import { getCurrentWorkDirectory } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const result = getCurrentWorkDirectory();
// currentPath: E.Fail | E.Success<string>

if (E.isRight(result)) {
	const currentPath = unwrap(result);
	// currentPath: string
}
