import { type GetEnumValue, type MaybePromise } from "@duplojs/utils";
export interface ServerUtilsFunction {
}
export declare const SupportedEnvironment: {
    BUN: "BUN";
    DENO: "DENO";
    NODE: "NODE";
    toTuple: () => ["BUN", "DENO", "NODE"];
    has: (value: string) => value is "BUN" | "DENO" | "NODE";
};
export type SupportedEnvironment = GetEnumValue<typeof SupportedEnvironment>;
declare const SymbolEnvironmentStore: unique symbol;
type SymbolEnvironmentStore = typeof SymbolEnvironmentStore;
declare module "@duplojs/utils" {
    interface GlobalStore {
        [SymbolEnvironmentStore]: SupportedEnvironment;
    }
}
/**
 * Set the execution environment for server-utils.
 * 
 * This is usually not required because the environment is detected automatically.
 * Use it to force a specific runtime (NODE, DENO, or BUN) when needed.
 * 
 * If a runtime-specific implementation is missing, the NODE version is used as
 * the fallback because it exists for all functions.
 * 
 */
export declare function setEnvironment(environment: SupportedEnvironment): void;
export declare function implementFunction<GenericFunctionName extends keyof ServerUtilsFunction>(functionName: GenericFunctionName, theFunctions: {
    NODE: ServerUtilsFunction[GenericFunctionName];
    BUN?: ServerUtilsFunction[GenericFunctionName];
    DENO?: ServerUtilsFunction[GenericFunctionName];
}): ServerUtilsFunction[GenericFunctionName];
export declare const nodeFileSystem: {
    readonly value: MaybePromise<typeof import("node:fs/promises")>;
};
export declare const nodeCrypto: {
    readonly value: MaybePromise<typeof import("node:crypto")>;
};
export declare const nodeOs: {
    readonly value: MaybePromise<typeof import("node:os")>;
};
export {};
