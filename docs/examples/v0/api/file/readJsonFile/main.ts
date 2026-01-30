import { SF } from "@duplojs/server-utils";
import { E, type ExpectType, unwrap } from "@duplojs/utils";

const config = await SF.readJsonFile("/tmp/config.json");
// config: E.Success<unknown> | SF.FileSystemLeft<"read-json-file">

const result = await SF.readJsonFile<{ content: string }>("/tmp/data.json");

if (E.isRight(result)) {
	const data = unwrap(result);

	type check = ExpectType<
		typeof data,
		{ content: string },
		"strict"
	>;
}
