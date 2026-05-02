import { getCurrentWorkDirectory } from "@server-utils/v0";
import { E, unwrap } from "@duplojs/utils";

const result = getCurrentWorkDirectory();
// currentPath: E.Error<unknown> | E.Success<string>

if (E.isRight(result)) {
	const currentPath = unwrap(result);
	// currentPath: string
}
