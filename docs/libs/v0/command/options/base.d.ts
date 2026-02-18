import { type Kind } from "@duplojs/utils";
declare const optionKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-option", unknown>>;
export interface Option<GenericName extends string = string, GenericExecuteOutputValue extends unknown = unknown> extends Kind<typeof optionKind.definition> {
    readonly name: GenericName;
    readonly description: string | null;
    readonly aliases: readonly string[];
    readonly hasValue: boolean;
    execute(args: readonly string[]): {
        result: GenericExecuteOutputValue;
        argumentRest: readonly string[];
    };
}
export interface InitOptionExecuteParams {
    isHere: boolean;
    value: string | undefined;
}
export declare function initOption<GenericName extends string, GenericExecuteOutputValue extends unknown>(name: GenericName, execute: (params: InitOptionExecuteParams) => GenericExecuteOutputValue, params?: {
    description?: string;
    aliases?: readonly string[];
    hasValue?: boolean;
}): Option<GenericName, GenericExecuteOutputValue>;
export {};
