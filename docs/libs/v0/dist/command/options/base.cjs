'use strict';

var AA = require('@duplojs/utils/array');
var SS = require('@duplojs/utils/string');
var kind = require('../../kind.cjs');
var error = require('../error.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var AA__namespace = /*#__PURE__*/_interopNamespaceDefault(AA);
var SS__namespace = /*#__PURE__*/_interopNamespaceDefault(SS);

const optionKind = kind.createDuplojsServerUtilsKind("command-option");
const regexOption = /^(?<dashes>-{1,2})(?<key>[A-Za-z0-9][A-Za-z0-9_-]*)(?:=(?<value>.*))?$/;
function initOption(name, execute, params) {
    const self = optionKind.setTo({
        name,
        execute: (args, error$1) => {
            const result = AA__namespace.reduce(args, AA__namespace.reduceFrom(null), ({ element, next, exit, index }) => {
                const extractResult = SS__namespace.extract(element, regexOption);
                if (!extractResult) {
                    return next(null);
                }
                const result = {
                    key: extractResult.namedGroups.key,
                    value: extractResult.namedGroups?.value,
                    index,
                };
                if (self.name !== result.key && !AA__namespace.includes(self.aliases, result.key)) {
                    return next(null);
                }
                return exit(result);
            });
            if (!result) {
                const executeResult = execute({
                    isHere: false,
                    value: undefined,
                }, error$1);
                if (executeResult === error.SymbolCommandError) {
                    return error.SymbolCommandError;
                }
                return {
                    result: executeResult,
                    argumentRest: args,
                };
            }
            else if (self.hasValue) {
                const value = result.value ?? args[result.index + 1];
                const isOption = SS__namespace.test(value ?? "", regexOption);
                if (isOption) {
                    return error.addIssue(error$1, {
                        type: "option",
                        target: self.name,
                        expected: `value for option --${self.name}`,
                        received: value,
                        message: `Missing value for option "${self.name}": received another option token instead of a value.`,
                    });
                }
                const executeResult = execute({
                    isHere: true,
                    value,
                }, error$1);
                if (executeResult === error.SymbolCommandError) {
                    return error.SymbolCommandError;
                }
                return {
                    result: executeResult,
                    argumentRest: AA__namespace.spliceDelete(args, result.index, result.value === undefined && args[result.index + 1] !== undefined
                        ? 2
                        : 1),
                };
            }
            else if (!self.hasValue && result.value !== undefined) {
                return error.addIssue(error$1, {
                    type: "option",
                    target: self.name,
                    expected: `option without value --${self.name}`,
                    received: result.value,
                    message: `Option "${self.name}" does not accept a value.`,
                });
            }
            const executeResult = execute({
                isHere: true,
                value: undefined,
            }, error$1);
            if (executeResult === error.SymbolCommandError) {
                return error.SymbolCommandError;
            }
            return {
                result: executeResult,
                argumentRest: AA__namespace.spliceDelete(args, result.index, 1),
            };
        },
        aliases: params?.aliases ?? [],
        description: params?.description ?? null,
        hasValue: params?.hasValue ?? false,
    });
    return self;
}

exports.initOption = initOption;
