import { SF } from "@duplojs/server-utils";
import { E, type ExpectType, G } from "@duplojs/utils";

const result = await SF.walkDirectory("/tmp/project");
// result: E.Success<Generator<...>> | SF.FileSystemLeft

const process = E.rightAsyncPipe(
	"/tmp/other",
	SF.walkDirectory,
	G.map(
		(value) => {
			type check = ExpectType<
				typeof value,
				SF.FileInterface | SF.FolderInterface | SF.UnknownInterface,
				"strict"
			>;

			return value;
		},
	),
);
