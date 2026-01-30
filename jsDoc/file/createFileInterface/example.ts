import { SF } from "@scripts";

const file = SF.createFileInterface("/tmp/example.json");
const name = file.getName();
// name: string | null

const mime = file.getMimeType();
// mime: string | null

const noExtension = SF.createFileInterface("/tmp/README");
const extension = noExtension.getExtension();
// extension: string | null

await file.rename("next.json");
