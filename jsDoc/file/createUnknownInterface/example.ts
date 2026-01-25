import { SF } from "@scripts";

const entry = SF.createUnknownInterface("/tmp/entry");
const name = entry.name;

await entry.exist();
await entry.stat();
