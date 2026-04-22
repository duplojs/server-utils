import type { Command } from "./create";
import type { Option } from "./options";
export declare function logCommandHelp(command: Command, depth?: number): void;
export declare function logExecOptionHelp(options: readonly Option[], depth?: number): void;
