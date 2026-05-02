import { SF } from "@server-utils/v0";
import { E } from "@duplojs/utils";

const result = await SF.exists("/tmp/file.txt");

if (E.isRight(result)) {
	// file.txt is exist
}
