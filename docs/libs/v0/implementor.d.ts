import { type GetEnumValue } from "@duplojs/utils";
export interface ServerUtilsFunction {
}
export declare const SupportedEnvironment: {
    BUN: "BUN";
    DENO: "DENO";
    NODE: "NODE";
    TEST: "TEST";
    toTuple: () => ["BUN", "DENO", "NODE", "TEST"];
    has: (value: string) => value is "BUN" | "DENO" | "NODE" | "TEST";
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
export declare namespace TESTImplementation {
    function clear(): void;
    function set<GenericFunctionName extends keyof ServerUtilsFunction>(functionName: GenericFunctionName, theFunction: ServerUtilsFunction[GenericFunctionName]): ServerUtilsFunction[GenericFunctionName];
    function get<GenericFunctionName extends keyof ServerUtilsFunction>(functionName: GenericFunctionName): ServerUtilsFunction[GenericFunctionName] | undefined;
}
export declare function implementFunction<GenericFunctionName extends keyof ServerUtilsFunction>(functionName: GenericFunctionName, theFunctions: {
    NODE: ServerUtilsFunction[GenericFunctionName];
    BUN?: ServerUtilsFunction[GenericFunctionName];
    DENO?: ServerUtilsFunction[GenericFunctionName];
}): ServerUtilsFunction[GenericFunctionName];
export {};
