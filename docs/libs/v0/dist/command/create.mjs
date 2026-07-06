import { justExec } from '@duplojs/utils';
import * as AA from '@duplojs/utils/array';
import * as GG from '@duplojs/utils/generator';
import * as OO from '@duplojs/utils/object';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { exitProcess } from '../common/exitProcess.mjs';
import { SymbolCommandError, addIssue } from './error.mjs';
import { helpOption, logCommandHelp } from './help.mjs';

const commandKind = createDuplojsServerUtilsKind("command");
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
        subject: justExec(() => {
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
        execute: async (args, error) => {
            if (self.subject?.type === "subCommand") {
                for (const command of self.subject.subCommands) {
                    if (args[0] === command.name) {
                        error.currentCommandPath[error.currentCommandPath.length] = command.name;
                        return command.execute(AA.shift(args), error);
                    }
                }
            }
            const help = await helpOption.execute(args, error);
            if (help === SymbolCommandError) {
                return SymbolCommandError;
            }
            else if (help.result) {
                logCommandHelp(self);
                return void exitProcess(0);
            }
            const commandOptions = await GG.asyncReduce(self.options, GG.reduceFrom({
                options: {},
                restArgs: args,
            }), async ({ element: option, lastValue, next, exit }) => {
                const optionResult = await option.execute(lastValue.restArgs, error);
                if (optionResult === SymbolCommandError) {
                    return exit(SymbolCommandError);
                }
                return next({
                    options: OO.override(lastValue.options, {
                        [option.name]: optionResult.result,
                    }),
                    restArgs: optionResult.argumentRest,
                });
            });
            if (commandOptions === SymbolCommandError) {
                return SymbolCommandError;
            }
            if (self.subject?.type === "argument") {
                if (self.subject.args.length !== commandOptions.restArgs.length) {
                    const expectedCount = self.subject.args.length;
                    const receivedCount = commandOptions.restArgs.length;
                    addIssue(error, {
                        type: "command",
                        expected: `${expectedCount} declared argument${expectedCount > 1 ? "s" : ""}`,
                        received: commandOptions.restArgs,
                        message: `Declared arguments count does not match received arguments count: expected ${expectedCount}, received ${receivedCount}.`,
                    });
                    return SymbolCommandError;
                }
                const commandArguments = await GG.asyncReduce(self.subject.args, GG.reduceFrom({
                    args: {},
                    restArgs: commandOptions.restArgs,
                }), async ({ element: argument, lastValue, next, exit }) => {
                    const firstArgument = AA.first(lastValue.restArgs);
                    const argumentResult = await argument.execute(firstArgument, error);
                    if (argumentResult === SymbolCommandError) {
                        return exit(SymbolCommandError);
                    }
                    return next({
                        args: OO.override(lastValue.args, { [argument.name]: argumentResult }),
                        restArgs: AA.shift(lastValue.restArgs),
                    });
                });
                if (commandArguments === SymbolCommandError) {
                    return SymbolCommandError;
                }
                await execute({
                    options: commandOptions.options,
                    args: commandArguments.args,
                });
            }
            else {
                if (commandOptions.restArgs.length > 0) {
                    addIssue(error, {
                        type: "command",
                        expected: "existing child command",
                        received: commandOptions.restArgs[0],
                        message: `Unknown child command "${commandOptions.restArgs[0]}".`,
                    });
                    return SymbolCommandError;
                }
                await execute({ options: commandOptions.options });
            }
            return;
        },
    });
    return self;
}

export { create, isCommands };
