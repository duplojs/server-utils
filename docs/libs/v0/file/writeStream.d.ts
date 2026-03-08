import { E } from "@duplojs/utils";
import type { FileSystemLeft } from "./types";
declare module "../implementor" {
    interface ServerUtilsFunction {
        writeStream(path: string, source: AsyncIterable<Uint8Array>): Promise<FileSystemLeft<"write-stream"> | E.Ok>;
    }
}
/**
 * Write an async byte stream to a file.
 * 
 * Consume an AsyncIterable of Uint8Array chunks and write them to the target path, returning ok/fail when the stream completes.
 * 
 * ```ts
 * const encoder = new TextEncoder();
 * 
 * const result = await SF.writeStream(
 * 	"/tmp/report.txt",
 * 	G.asyncMap(
 * 		["first line\n", "second line\n"],
 * 		(line) => encoder.encode(line),
 * 	),
 * );
 * // result: E.Ok | SF.FileSystemLeft<"write-stream">
 * 
 * await SF.writeStream(
 * 	"/tmp/events.json",
 * 	G.asyncMap(
 * 		[
 * 			{
 * 				type: "start",
 * 				at: "2026-03-08T10:00:00.000Z",
 * 			},
 * 			{
 * 				type: "finish",
 * 				at: "2026-03-08T10:00:02.000Z",
 * 			},
 * 		],
 * 		(event) => encoder.encode(`${JSON.stringify(event)}\n`),
 * 	),
 * );
 * ```
 * 
 * @remarks
 * This is useful when data is already produced as chunks and should not be buffered into a single Uint8Array first.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/writeStream
 * @namespace SF
 * 
 */
export declare const writeStream: (path: string, source: AsyncIterable<Uint8Array>) => Promise<FileSystemLeft<"write-stream"> | E.Ok>;
