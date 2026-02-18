export { setEnvironment, TESTImplementation } from "./implementor";
/**
 * Common utilities shared across runtimes.
 * 
 * **How to import:**
 * - From the main entry (namespace style)
 * - Via direct import for tree-shaking
 * 
 * ```ts
 * import { getCurrentWorkDirectory } from "@duplojs/server-utils";
 * import * as DServerCommon from "@duplojs/server-utils/common";
 * import { getCurrentWorkDirectory } from "@duplojs/server-utils/common";
 * ```
 * 
 * What you will find in this namespace:
 * - `environmentVariable`
 * - `getCurrentWorkDirectory`
 * - `setCurrentWorkingDirectory`
 * - `exitProcess`
 * - `getProcessArguments`
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common
 * 
 */
export * from "./common";
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
 * - Move/copy/remove: `copy`, `move`, `relocate`, `rename`, `remove`, `truncate`
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
export * as SF from "./file";
export * as DServerFile from "./file";
export * as SDP from "./dataParser";
export * as DServerDataParser from "./dataParser";
export * as SDPC from "./dataParser/parsers/coerce";
export * as DServerDataParserCoerce from "./dataParser/parsers/coerce";
export * as SDPE from "./dataParser/extended";
export * as DServerDataParserExtended from "./dataParser/extended";
/**
 * Command utilities to define and execute CLI command trees.
 * 
 * This namespace provides builders for commands and options, plus a runtime entrypoint that reads process arguments and dispatches handlers.
 * 
 * **How to import:**
 * - From the main entry (namespace style)
 * - Via direct import for tree-shaking
 * 
 * ```ts
 * import { SC, DServerCommand } from "@duplojs/server-utils";
 * import * as SC from "@duplojs/server-utils/command";
 * ```
 * 
 * What you will find in this namespace:
 * - Command builders: `create`, `exec`
 * - Option builders: `createBooleanOption`, `createOption`, `createArrayOption`
 * - Rendering helpers: `logHelp`, `Printer`
 * - Errors and types for command parsing
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command
 * @namespace SC
 * 
 */
export * as SC from "./command";
export * as DServerCommand from "./command";
