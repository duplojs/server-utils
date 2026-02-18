'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var help = require('./help.cjs');
var errors = require('./errors.cjs');
var boolean = require('./options/boolean.cjs');
var exitProcess = require('../common/exitProcess.cjs');

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
        execute: async (args) => {
            if (self.subject instanceof Array) {
                for (const command of self.subject) {
                    if (args[0] === command.name) {
                        await command.execute(utils.A.shift(args));
                        return;
                    }
                }
            }
            const help$1 = helpOption.execute(args);
            if (help$1.result) {
                help.logHelp(self);
                exitProcess.exitProcess(0);
                return;
            }
            const commandOptions = utils.A.reduce(self.options, utils.A.reduceFrom({
                options: {},
                restArgs: args,
            }), ({ element: option, lastValue, next }) => {
                const optionResult = option.execute(lastValue.restArgs);
                return next({
                    options: utils.O.override(lastValue.options, {
                        [option.name]: optionResult.result,
                    }),
                    restArgs: optionResult.argumentRest,
                });
            });
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (utils.DP.identifier(self.subject, utils.DP.arrayKind)
                || utils.DP.identifier(self.subject, utils.DP.tupleKind)) {
                await execute({
                    options: commandOptions.options,
                    subject: self.subject.parseOrThrow(commandOptions.restArgs),
                });
            }
            else if (utils.DP.identifier(self.subject, utils.DP.dataParserKind)) {
                if (commandOptions.restArgs.length !== 1) {
                    throw new errors.CommandManyArgumentsError(commandOptions.restArgs.length);
                }
                await execute({
                    options: commandOptions.options,
                    subject: self.subject.parseOrThrow(commandOptions.restArgs),
                });
            }
            else {
                await execute({});
            }
            exitProcess.exitProcess(0);
            return;
        },
    });
    return self;
}

exports.create = create;
