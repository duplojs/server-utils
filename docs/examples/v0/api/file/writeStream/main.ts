import { SF } from "@duplojs/server-utils";
import { type ExpectType, G, type E } from "@duplojs/utils";

const encoder = new TextEncoder();
const result = await SF.writeStream(
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

type check = ExpectType<
	typeof result,
	SF.FileSystemLeft<"write-stream"> | E.Ok,
	"strict"
>;
