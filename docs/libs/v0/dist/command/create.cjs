'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var GG = require('@duplojs/utils/generator');
var OO = require('@duplojs/utils/object');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var CC = require('@duplojs/utils/clean');
var kind = require('../kind.cjs');
var exitProcess = require('../common/exitProcess.cjs');
var error = require('./error.cjs');
var help = require('./help.cjs');
var boolean = require('./options/boolean.cjs');
var file = require('../dataParser/parsers/file.cjs');

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
var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);
var CC__namespace = /*#__PURE__*/_interopNamespaceDefault(CC);

const commandKind = kind.createDuplojsServerUtilsKind("command");
/**
 * @internal
 */
function isCommands(subject) {
    return subject instanceof Array
        && subject.length >= 1
        && AA__namespace.every(subject, commandKind.has);
}
function commandSubjectToDataParser(contract) {
    if (contract instanceof Array) {
        return DDP__namespace.tuple(AA__namespace.map(contract, (part) => commandSubjectToDataParser(part)));
    }
    if (utils.hasSomeKinds(contract, [
        DDP__namespace.stringKind,
        DDP__namespace.numberKind,
        DDP__namespace.bigIntKind,
        DDP__namespace.dateKind,
        DDP__namespace.timeKind,
        DDP__namespace.nilKind,
        file.fileKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        return clone;
    }
    if (DDP__namespace.identifier(contract, DDP__namespace.arrayKind)) {
        return DDP__namespace.array(commandSubjectToDataParser(contract.definition.element), contract.definition);
    }
    if (DDP__namespace.identifier(contract, DDP__namespace.tupleKind)) {
        return DDP__namespace.tuple(contract.definition.shape.map((part) => commandSubjectToDataParser(part)), {
            ...contract.definition,
            rest: contract.definition.rest
                ? commandSubjectToDataParser(contract.definition.rest)
                : undefined,
        });
    }
    if (DDP__namespace.identifier(contract, DDP__namespace.dataParserKind)) {
        return contract;
    }
    return CC__namespace.toMapDataParser(contract, { coerce: true });
}
const helpOption = boolean.createBooleanOption("help", { aliases: ["h"] });
function create(...args) {
    const [name, params, execute] = args.length === 2
        ? [args[0], {}, args[1]]
        : args;
    const subject = (params.subject
        && !isCommands(params.subject)
        ? commandSubjectToDataParser(params.subject)
        : params.subject) ?? null;
    const self = commandKind.setTo({
        name,
        description: params.description ?? null,
        options: params.options ?? [],
        subject: subject,
        execute: async (args, error$1) => {
            const commandError = error$1;
            const pathIndex = commandError.currentCommandPath.length;
            if (isCommands(self.subject)) {
                for (const command of self.subject) {
                    if (args[0] === command.name) {
                        commandError.currentCommandPath[pathIndex] = command.name;
                        return command.execute(AA__namespace.shift(args), commandError);
                    }
                }
            }
            const help$1 = await helpOption.execute(args, commandError);
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
                const optionResult = await option.execute(lastValue.restArgs, commandError);
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
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (DDP__namespace.identifier(self.subject, DDP__namespace.arrayKind)
                || DDP__namespace.identifier(self.subject, DDP__namespace.tupleKind)) {
                const subjectResult = self.subject.isAsynchronous()
                    ? await self.subject.asyncParse(commandOptions.restArgs)
                    : self.subject.parse(commandOptions.restArgs);
                if (EE__namespace.isLeft(subjectResult)) {
                    error.addIssueDataParser(commandError, utils.unwrap(subjectResult), {
                        type: "subject",
                    });
                    return error.SymbolCommandError;
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
                    return error.SymbolCommandError;
                }
                const subjectResult = self.subject.isAsynchronous()
                    ? await self.subject.asyncParse(commandOptions.restArgs[0])
                    : self.subject.parse(commandOptions.restArgs[0]);
                if (EE__namespace.isLeft(subjectResult)) {
                    error.addIssueDataParser(commandError, utils.unwrap(subjectResult), {
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
                await execute({});
            }
            return void exitProcess.exitProcess(0);
        },
    });
    return self;
}

exports.create = create;
exports.isCommands = isCommands;
