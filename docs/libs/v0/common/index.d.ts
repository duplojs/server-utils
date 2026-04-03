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
 * - `getCurrentWorkDirectoryOrThrow`
 * - `setCurrentWorkingDirectory`
 * - `setCurrentWorkingDirectoryOrThrow`
 * - `exitProcess`
 * - `getProcessArguments`
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/common
 * 
 */
export * from "./getCurrentWorkDirectory";
export * from "./getCurrentWorkDirectoryOrThrow";
export * from "./setCurrentWorkingDirectory";
export * from "./setCurrentWorkingDirectoryOrThrow";
export * from "./environmentVariable";
export * from "./environmentVariableOrThrow";
export * from "./exitProcess";
export * from "./getProcessArguments";
