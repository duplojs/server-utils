'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var GG = require('@duplojs/utils/generator');
var OO = require('@duplojs/utils/object');
var kind = require('../kind.cjs');
var exitProcess = require('../common/exitProcess.cjs');
var error = require('./error.cjs');
var help = require('./help.cjs');

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
var GG__namespace = /*#__PURE__*/_interopNamespaceDefault(GG);
var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);

const commandKind = kind.createDuplojsServerUtilsKind("command");
function isCommands(input) {
    return input instanceof Array
        ? input.every(commandKind.has)
        : false;
}
function create(...args) {
    const [name, params, execute] = args.length === 2
        ? [args[0], {}, args[1]]
        : args;
    const self = commandKind.setTo({
        name,
        description: params.description ?? null,
        options: params.options ?? [],
        subject: utils.justExec(() => {
            if (isCommands(params.subjects)) {
                return {
                    type: "subCommand",
                    subCommands: params.subjects,
                };
            }
            else if (params.subjects) {
                return {
                    type: "argument",
                    args: params.subjects,
                };
            }
            return null;
        }),
        execute: async (args, error$1) => {
            if (self.subject?.type === "subCommand") {
                for (const command of self.subject.subCommands) {
                    if (args[0] === command.name) {
                        error$1.currentCommandPath[error$1.currentCommandPath.length] = command.name;
                        return command.execute(AA__namespace.shift(args), error$1);
                    }
                }
            }
            const help$1 = await help.helpOption.execute(args, error$1);
            if (help$1 === error.SymbolCommandError) {
                return error.SymbolCommandError;
            }
            else if (help$1.result) {
                help.logCommandHelp(self);
                return void exitProcess.exitProcess(0);
            }
            const commandOptions = await GG__namespace.asyncReduce(self.options, GG__namespace.reduceFrom({
                options: {},
                restArgs: args,
            }), async ({ element: option, lastValue, next, exit }) => {
                const optionResult = await option.execute(lastValue.restArgs, error$1);
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
                return error.SymbolCommandError;
            }
            if (self.subject?.type === "argument") {
                if (self.subject.args.length !== commandOptions.restArgs.length) {
                    const expectedCount = self.subject.args.length;
                    const receivedCount = commandOptions.restArgs.length;
                    error.addIssue(error$1, {
                        type: "command",
                        expected: `${expectedCount} declared argument${expectedCount > 1 ? "s" : ""}`,
                        received: commandOptions.restArgs,
                        message: `Declared arguments count does not match received arguments count: expected ${expectedCount}, received ${receivedCount}.`,
                    });
                    return error.SymbolCommandError;
                }
                const commandArguments = await GG__namespace.asyncReduce(self.subject.args, GG__namespace.reduceFrom({
                    args: {},
                    restArgs: commandOptions.restArgs,
                }), async ({ element: argument, lastValue, next, exit }) => {
                    const firstArgument = AA__namespace.first(lastValue.restArgs);
                    const argumentResult = await argument.execute(firstArgument, error$1);
                    if (argumentResult === error.SymbolCommandError) {
                        return exit(error.SymbolCommandError);
                    }
                    return next({
                        args: OO__namespace.override(lastValue.args, { [argument.name]: argumentResult }),
                        restArgs: AA__namespace.shift(lastValue.restArgs),
                    });
                });
                if (commandArguments === error.SymbolCommandError) {
                    return error.SymbolCommandError;
                }
                await execute({
                    options: commandOptions.options,
                    args: commandArguments.args,
                });
            }
            else {
                if (commandOptions.restArgs.length > 0) {
                    error.addIssue(error$1, {
                        type: "command",
                        expected: "existing child command",
                        received: commandOptions.restArgs[0],
                        message: `Unknown child command "${commandOptions.restArgs[0]}".`,
                    });
                    return error.SymbolCommandError;
                }
                await execute({ options: commandOptions.options });
            }
            return void exitProcess.exitProcess(0);
        },
    });
    return self;
}

exports.create = create;
exports.isCommands = isCommands;
