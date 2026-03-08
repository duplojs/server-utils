import { G } from "@duplojs/utils";
import { SF } from "@scripts";

const encoder = new TextEncoder();

const result = await SF.writeStream(
	"/tmp/report.txt",
	G.asyncMap(
		["first line\n", "second line\n"],
		(line) => encoder.encode(line),
	),
);
// result: E.Ok | SF.FileSystemLeft<"write-stream">

await SF.writeStream(
	"/tmp/events.json",
	G.asyncMap(
		[
			{
				type: "start",
				at: "2026-03-08T10:00:00.000Z",
			},
			{
				type: "finish",
				at: "2026-03-08T10:00:02.000Z",
			},
		],
		(event) => encoder.encode(`${JSON.stringify(event)}\n`),
	),
);
