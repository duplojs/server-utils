'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var OO = require('@duplojs/utils/object');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var exitProcess = require('../common/exitProcess.cjs');
var error = require('./error.cjs');
var help = require('./help.cjs');
var boolean = require('./options/boolean.cjs');

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
var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);
var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

function printError(commandError, error$1) {
    if (!error$1) {
        // eslint-disable-next-line no-console
        console.error(error.interpretCommandError(commandError));
        exitProcess.exitProcess(1);
    }
    return error.SymbolCommandError;
}
const commandKind = kind.createDuplojsServerUtilsKind("command");
const helpOption = boolean.createBooleanOption("help", { aliases: ["h"] });
function create(...args) {
    const [name, params, execute] = args.length === 2
        ? [args[0], {}, args[1]]
        : args;
    const self = commandKind.setTo({
        name,
        description: params.description ?? null,
        options: params.options ?? [],
        subject: params.subject ?? null,
        execute: async (args, error$1) => {
            const commandError = error$1 ?? error.createError(self.name);
            const pathIndex = commandError.currentCommandPath.length;
            if (self.subject instanceof Array) {
                for (const command of self.subject) {
                    if (args[0] === command.name) {
                        let result = undefined;
                        error.setErrorPath(commandError, command.name, pathIndex);
                        try {
                            result = await command.execute(AA__namespace.shift(args), commandError);
                        }
                        finally {
                            error.popErrorPath(commandError);
                        }
                        if (result === error.SymbolCommandError) {
                            return printError(commandError, error$1);
                        }
                        return result;
                    }
                }
            }
            const help$1 = helpOption.execute(args, commandError);
            if (help$1 === error.SymbolCommandError) {
                return printError(commandError, error$1);
            }
            else if (help$1.result) {
                help.logCommandHelp(self);
                return void exitProcess.exitProcess(0);
            }
            const commandOptions = AA__namespace.reduce(self.options, AA__namespace.reduceFrom({
                options: {},
                restArgs: args,
            }), ({ element: option, lastValue, next, exit }) => {
                const optionResult = option.execute(lastValue.restArgs, commandError);
                if (optionResult === error.SymbolCommandError) {
                    return exit(error.SymbolCommandError);
                }
                return next({
                    options: OO__namespace.override(lastValue.options, {
                        [option.name]: optionResult.result,
                    }),
                    restArgs: optionResult.argumentRest,
                });
            });
            if (commandOptions === error.SymbolCommandError) {
                return printError(commandError, error$1);
            }
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (DDP__namespace.identifier(self.subject, DDP__namespace.arrayKind)
                || DDP__namespace.identifier(self.subject, DDP__namespace.tupleKind)) {
                const subjectResult = self.subject.parse(commandOptions.restArgs);
                if (EE__namespace.isLeft(subjectResult)) {
                    error.addDataParserError(commandError, utils.unwrap(subjectResult), {
                        type: "subject",
                    });
                    return printError(commandError, error$1);
                }
                await execute({
                    options: commandOptions.options,
                    subject: utils.unwrap(subjectResult),
                });
            }
            else if (DDP__namespace.identifier(self.subject, DDP__namespace.dataParserKind)) {
                if (commandOptions.restArgs.length > 1) {
                    error.addIssue(commandError, {
                        type: "command",
                        expected: "exactly one subject argument",
                        received: commandOptions.restArgs,
                        message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
                    });
                    return printError(commandError, error$1);
                }
                const subjectResult = self.subject.parse(commandOptions.restArgs);
                if (EE__namespace.isLeft(subjectResult)) {
                    error.addDataParserError(commandError, utils.unwrap(subjectResult), {
                        type: "subject",
                    });
                    return printError(commandError, error$1);
                }
                await execute({
                    options: commandOptions.options,
                    subject: utils.unwrap(subjectResult),
                });
            }
            else {
                await execute({});
            }
            return void exitProcess.exitProcess(0);
        },
    });
    return self;
}

exports.create = create;
