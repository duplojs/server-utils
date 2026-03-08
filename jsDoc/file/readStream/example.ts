import { SF } from "@scripts";

const chunks: Uint8Array[] = [];
for await (const chunk of SF.readStream("/tmp/video.mp4")) {
	chunks.push(chunk);
}

let totalSize = 0;
for await (const chunk of SF.readStream("/tmp/archive.tar")) {
	totalSize += chunk.byteLength;
}
// totalSize: number

const decoder = new TextDecoder();
let preview = "";
for await (const chunk of SF.readStream("/tmp/app.log")) {
	preview += decoder.decode(chunk, { stream: true });

	if (preview.length > 120) {
		break;
	}
}
preview += decoder.decode();
// preview: string
