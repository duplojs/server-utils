/**
 * File system utilities for common read/write and path operations.
 * 
 * **How to import:**
 * - From the main entry (namespace style)
 * - Via direct import for tree-shaking
 * 
 * ```ts
 * import { DServerFile, SF } from "@duplojs/server-utils";
 * import * as DServerFile from "@duplojs/server-utils/file";
 * import * as SF from "@duplojs/server-utils/file";
 * ```
 * 
 * What you will find in this namespace:
 * - Read/write: `readFile`, `readTextFile`, `writeFile`, `writeTextFile`, `appendFile`, `appendTextFile`
 * - JSON: `readJsonFile`, `writeJsonFile`
 * - Directory: `readDirectory`, `makeDirectory`, `ensureDirectory`, `walkDirectory`
 * - Move/copy/remove: `copy`, `move`, `rename`, `remove`, `truncate`
 * - Links: `symlink`, `readLink`, `link`, `linkStat`
 * - Metadata: `exists`, `stat`, `realPath`, `setMode`, `setOwner`, `setTime`
 * - Helpers: `ensureFile`, `makeTemporaryDirectory`, `makeTemporaryFile`
 * - Interfaces: `createFileInterface`, `createFolderInterface`, `createUnknownInterface`
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file
 * 
 * @namespace SF
 * 
 */
export * from "./types";
export * from "./readFile";
export * from "./readTextFile";
export * from "./writeFile";
export * from "./writeTextFile";
export * from "./appendFile";
export * from "./appendTextFile";
export * from "./exists";
export * from "./stat";
export * from "./linkStat";
export * from "./realPath";
export * from "./readDirectory";
export * from "./makeDirectory";
export * from "./ensureDirectory";
export * from "./remove";
export * from "./copy";
export * from "./move";
export * from "./fileInterface";
export * from "./folderInterface";
export * from "./truncate";
export * from "./setMode";
export * from "./setOwner";
export * from "./setTime";
export * from "./symlink";
export * from "./readLink";
export * from "./link";
export * from "./rename";
export * from "./unknownInterface";
export * from "./walkDirectory";
export * from "./makeTemporaryDirectory";
export * from "./makeTemporaryFile";
export * from "./readJsonFile";
export * from "./ensureFile";
export * from "./writeJsonFile";
export * from "./mimeType";
