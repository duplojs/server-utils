import { SF } from "@scripts";

const entry = SF.createUnknownInterface("/tmp/entry");

if (SF.isUnknownInterface(entry)) {
	// entry: UnknownInterface
	await entry.stat();
}
