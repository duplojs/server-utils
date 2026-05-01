'use strict';

var utils = require('@duplojs/utils');

/* eslint-disable @typescript-eslint/consistent-type-imports */
utils.createEnum(["BUN", "DENO", "NODE", "TEST"]);
const SymbolEnvironmentStore = Symbol("environmentStore");
const environmentStoreHandler = utils.createGlobalStore(SymbolEnvironmentStore, (() => {
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
exports.TESTImplementation = void 0;
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
})(exports.TESTImplementation || (exports.TESTImplementation = {}));
function implementFunction(functionName, theFunctions) {
    const environmentFunctions = {
        NODE: theFunctions.NODE,
        BUN: theFunctions.BUN ||= theFunctions.NODE,
        DENO: theFunctions.DENO ||= theFunctions.NODE,
        get TEST() {
            const theFunction = exports.TESTImplementation.get(functionName);
            if (!theFunction) {
                throw new Error(`Missing function implementation "${functionName}" in TEST environment.`);
            }
            return theFunction;
        },
    };
    return (...args) => environmentFunctions[environmentStoreHandler.value](...args);
}
const nodeFileSystem = utils.memoPromise(() => import('node:fs/promises'));
const nodeCrypto = utils.memoPromise(() => import('node:crypto'));
const nodeOs = utils.memoPromise(() => import('node:os'));

exports.implementFunction = implementFunction;
exports.nodeCrypto = nodeCrypto;
exports.nodeFileSystem = nodeFileSystem;
exports.nodeOs = nodeOs;
exports.setEnvironment = setEnvironment;
