import { createEnum, createGlobalStore } from '@duplojs/utils';

/* eslint-disable @typescript-eslint/consistent-type-imports */
createEnum(["BUN", "DENO", "NODE"]);
const SymbolEnvironmentStore = Symbol("environmentStore");
const environmentStoreHandler = createGlobalStore(SymbolEnvironmentStore, (() => {
    if (typeof Deno !== "undefined") {
        return "DENO";
    }
    if (typeof Bun !== "undefined") {
        return "BUN";
    }
    if (typeof process !== "undefined" && process.versions?.node) {
        return "NODE";
    }
    return "NODE";
})());
/**
 * {@include setEnvironment.md}
 */
function setEnvironment(environment) {
    environmentStoreHandler.set(environment);
}
function implementFunction(functionName, theFunctions) {
    theFunctions.BUN ||= theFunctions.NODE;
    theFunctions.DENO ||= theFunctions.NODE;
    return (...args) => theFunctions[environmentStoreHandler.value](...args);
}
function createImportCache(theFunction) {
    const memo = {
        get value() {
            return theFunction()
                .then((value) => {
                Object.defineProperty(memo, "value", {
                    value,
                });
                return value;
            });
        },
    };
    return memo;
}
const nodeFileSystem = createImportCache(() => import('node:fs/promises'));
const nodeCrypto = createImportCache(() => import('node:crypto'));
const nodeOs = createImportCache(() => import('node:os'));

export { implementFunction, nodeCrypto, nodeFileSystem, nodeOs, setEnvironment };
