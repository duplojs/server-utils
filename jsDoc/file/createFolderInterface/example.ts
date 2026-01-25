import { SF } from "@scripts";

const folder = SF.createFolderInterface("/tmp/project");
const parent = folder.getParentPath();

await folder.getChildren();
await folder.walk();
