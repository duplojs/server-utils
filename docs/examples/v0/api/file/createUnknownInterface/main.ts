import { SF } from "@duplojs/server-utils";

const entry = SF.createUnknownInterface("/tmp/entry");
const name = entry.getName();
// name: string | null

await entry.exist();
await entry.stat();

if (SF.isUnknownInterface(entry)) {
	// entry: SF.UnknownInterface
	await entry.stat();
}
