import { SF } from "@scripts";

const folder = SF.createFolderInterface("/tmp/project");
const name = folder.getName();
// name: string | null

const parent = folder.getParentPath();
// parent: string | null

await folder.getChildren();

const otherFolder = SF.createFolderInterface("/tmp/archive");
await otherFolder.walk();
