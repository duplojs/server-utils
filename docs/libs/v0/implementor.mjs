import { createEnum, createGlobalStore } from '@duplojs/utils';

createEnum(["BUN", "DENO", "NODE", "TEST"]);
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
var TESTImplementation;
(function (TESTImplementation) {
    const store = new Map();
    function clear() {
        store.clear();
    }
    TESTImplementation.clear = clear;
    function set(functionName, theFunction) {
        store.set(functionName, theFunction);
        return theFunction;
    }
    TESTImplementation.set = set;
    function get(functionName) {
        return store.get(functionName);
    }
    TESTImplementation.get = get;
})(TESTImplementation || (TESTImplementation = {}));
function implementFunction(functionName, theFunctions) {
    const environmentFunctions = {
        NODE: theFunctions.NODE,
        BUN: theFunctions.BUN ||= theFunctions.NODE,
        DENO: theFunctions.DENO ||= theFunctions.NODE,
        get TEST() {
            const theFunction = TESTImplementation.get(functionName);
            if (!theFunction) {
                throw new Error(`Missing function implementation "${functionName}" in TEST environment.`);
            }
            return theFunction;
        },
    };
    return (...args) => environmentFunctions[environmentStoreHandler.value](...args);
}

export { TESTImplementation, implementFunction, setEnvironment };
