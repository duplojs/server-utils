import { SF } from "@scripts";

const file = SF.createFileInterface("/tmp/example.json");
const name = file.name;

await file.rename("next.json");
await file.stat();
