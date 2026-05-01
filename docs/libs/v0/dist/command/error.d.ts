import type * as DDP from "@duplojs/utils/dataParser";
export interface CommandErrorIssue {
    readonly type: "command" | "option" | "subject";
    readonly commandPath: readonly string[];
    readonly target?: string;
    readonly parserPath?: string;
    readonly expected: string;
    readonly received: unknown;
    readonly message?: string;
}
export interface CommandError {
    readonly issues: CommandErrorIssue[];
    readonly currentCommandPath: string[];
}
export declare const SymbolCommandError: unique symbol;
export type SymbolCommandError = typeof SymbolCommandError;
export declare function createError(commandName: string): CommandError;
export declare function addIssue(error: CommandError, issue: Omit<CommandErrorIssue, "commandPath">): SymbolCommandError;
export declare function addIssueDataParser(error: CommandError, parseError: DDP.DataParserError, params: {
    type: "option" | "subject";
    target?: string;
}): SymbolCommandError;
export declare function interpretCommandError(error: CommandError): string;
export declare function interpretExecOptionError(error: CommandError): string;
