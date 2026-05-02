import { SF } from "@server-utils/v0";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.readTextFile("./config.json");

if (E.isRight(result)) {
	const content = unwrap(result);
	console.log(content);
}
