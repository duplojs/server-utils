import { SF } from "@duplojs/server-utils";
import { G } from "@duplojs/utils";

const decoder = new TextDecoder();

const fileContent = await G.asyncReduce(
	SF.readStream("/tmp/app.log"),
	G.reduceFrom(""),
	({ element, lastValue, next }) => next(
		lastValue + decoder.decode(element, { stream: true }),
	),
);

