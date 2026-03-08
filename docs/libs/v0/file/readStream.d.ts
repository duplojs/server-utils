declare module "../implementor" {
    interface ServerUtilsFunction {
        readStream<GenericPath extends string>(path: GenericPath): AsyncGenerator<Uint8Array>;
    }
}
/**
 * Read a file as a byte stream.
 * 
 * Create an async generator that yields each file chunk as a Uint8Array, which is useful for large files or streaming transformations.
 * 
 * ```ts
 * const chunks: Uint8Array[] = [];
 * for await (const chunk of SF.readStream("/tmp/video.mp4")) {
 * 	chunks.push(chunk);
 * }
 * 
 * let totalSize = 0;
 * for await (const chunk of SF.readStream("/tmp/archive.tar")) {
 * 	totalSize += chunk.byteLength;
 * }
 * // totalSize: number
 * 
 * const decoder = new TextDecoder();
 * let preview = "";
 * for await (const chunk of SF.readStream("/tmp/app.log")) {
 * 	preview += decoder.decode(chunk, { stream: true });
 * 
 * 	if (preview.length > 120) {
 * 		break;
 * 	}
 * }
 * preview += decoder.decode();
 * // preview: string
 * 
 * ```
 * 
 * @remarks
 * Consume the returned async generator with `for await...of`.
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/readStream
 * @namespace SF
 * 
 */
export declare const readStream: <GenericPath extends string>(path: GenericPath) => AsyncGenerator<Uint8Array>;
