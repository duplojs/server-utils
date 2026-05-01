'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var GG = require('@duplojs/utils/generator');
var OO = require('@duplojs/utils/object');
var EE = require('@duplojs/utils/either');
var kind = require('../../kind.cjs');
var exitProcess = require('../../common/exitProcess.cjs');
var error = require('../error.cjs');
var help = require('../help.cjs');
var subject = require('./subject.cjs');

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
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

const commandKind = kind.createDuplojsServerUtilsKind("command");
function isCommand(input) {
    return input instanceof Array
        ? input.every(commandKind.has)
        : commandKind.has(input);
}
function create(...args) {
    const [name, params, execute] = args.length === 2
        ? [args[0], {}, args[1]]
        : args;
    const self = commandKind.setTo({
        name,
        description: params.description ?? null,
        options: params.options ?? [],
        children: utils.justExec(() => {
            if (isCommand(params.subject)) {
                return {
                    type: "subCommand",
                    subCommands: AA__namespace.coalescing(params.subject),
                };
            }
            else if (params.subject) {
                return {
                    type: "subject",
                    subject: params.subject,
                    dataParser: subject.subjectToDataParser(params.subject),
                };
            }
            return null;
        }),
        execute: async (args, error$1) => {
            if (self.children?.type === "subCommand") {
                for (const command of self.children.subCommands) {
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
            if (self.children?.type === "subject") {
                const hasMultiSubject = subject.isMultiSubject(self.children.subject);
                if (!hasMultiSubject
                    && commandOptions.restArgs.length > 1) {
                    error.addIssue(error$1, {
                        type: "command",
                        expected: "exactly one subject argument",
                        received: commandOptions.restArgs,
                        message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
                    });
                    return error.SymbolCommandError;
                }
                const subjectInput = hasMultiSubject
                    ? commandOptions.restArgs
                    : commandOptions.restArgs[0];
                const subjectResult = self.children.dataParser.isAsynchronous()
                    ? await self.children.dataParser.asyncParse(subjectInput)
                    : self.children.dataParser.parse(subjectInput);
                if (EE__namespace.isLeft(subjectResult)) {
                    error.addIssueDataParser(error$1, utils.unwrap(subjectResult), {
                        type: "subject",
                    });
                    return error.SymbolCommandError;
                }
                await execute({
                    options: commandOptions.options,
                    subject: utils.unwrap(subjectResult),
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
exports.isCommand = isCommand;
