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
 * - Argument builder: `createArgument`
 * - Option builders: `createBooleanOption`, `createOption`, `createArrayOption`
 * - Option-only executor: `execOptions`
 * - Errors and types for command parsing
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/command
 * @namespace SC
 * 
 */
export * from "./types";
export * from "./argument";
export * from "./options";
export * from "./create";
export * from "./exec";
export * from "./execOptions";
