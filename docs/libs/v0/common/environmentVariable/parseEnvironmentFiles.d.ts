import * as SF from "../../file";
export declare function parseEnvironmentLine(line: string): Record<string, string>;
export declare function parseEnvironmentFiles(baseEnv: Record<string, string>, paths: string[]): Promise<SF.FileSystemLeft<"read-text-file"> | Record<string, string>[]>;
