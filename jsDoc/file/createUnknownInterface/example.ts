import { SF } from "@scripts";

const entry = SF.createUnknownInterface("/tmp/entry");
const name = entry.getName();
// name: string | null

const parent = entry.getParentPath();
// parent: string | null

await entry.exist();
await entry.stat();

const otherEntry = SF.createUnknownInterface("/tmp/another-entry");
await otherEntry.stat();
