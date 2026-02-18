declare const CommandManyArgumentsError_base: new (params: {
    "@DuplojsServerUtils/command-many-arguments-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-many-arguments-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"command-many-arguments-error", unknown>, unknown>;
export declare class CommandManyArgumentsError extends CommandManyArgumentsError_base {
    restArgumentsLength: number;
    constructor(restArgumentsLength: number);
}
declare const CommandOptionValueLooksLikeOptionError_base: new (params: {
    "@DuplojsServerUtils/command-option-value-looks-like-option-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-option-value-looks-like-option-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"command-option-value-looks-like-option-error", unknown>, unknown>;
export declare class CommandOptionValueLooksLikeOptionError extends CommandOptionValueLooksLikeOptionError_base {
    optionName: string;
    value: string | undefined;
    constructor(optionName: string, value: string | undefined);
}
declare const CommandOptionValueNotRequiredError_base: new (params: {
    "@DuplojsServerUtils/command-option-value-not-required-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-option-value-not-required-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"command-option-value-not-required-error", unknown>, unknown>;
export declare class CommandOptionValueNotRequiredError extends CommandOptionValueNotRequiredError_base {
    optionName: string;
    constructor(optionName: string);
}
declare const CommandOptionRequiredError_base: new (params: {
    "@DuplojsServerUtils/command-option-required-error"?: unknown;
}, parentParams: readonly [message?: string | undefined, options?: ErrorOptions | undefined]) => Error & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"@DuplojsServerUtils/command-option-required-error", unknown>, unknown> & import("@duplojs/utils").Kind<import("@duplojs/utils").KindDefinition<"command-option-required-error", unknown>, unknown>;
export declare class CommandOptionRequiredError extends CommandOptionRequiredError_base {
    optionName: string;
    constructor(optionName: string);
}
export {};
