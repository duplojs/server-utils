import { justExec, unwrap } from '@duplojs/utils';
import * as AA from '@duplojs/utils/array';
import * as GG from '@duplojs/utils/generator';
import * as OO from '@duplojs/utils/object';
import * as EE from '@duplojs/utils/either';
import { createDuplojsServerUtilsKind } from '../../kind.mjs';
import { exitProcess } from '../../common/exitProcess.mjs';
import { SymbolCommandError, addIssue, addIssueDataParser } from '../error.mjs';
import { helpOption, logCommandHelp } from '../help.mjs';
import { isMultiSubject, subjectToDataParser } from './subject.mjs';

const commandKind = createDuplojsServerUtilsKind("command");
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
        children: justExec(() => {
            if (isCommand(params.subject)) {
                return {
                    type: "subCommand",
                    subCommands: AA.coalescing(params.subject),
                };
            }
            else if (params.subject) {
                return {
                    type: "subject",
                    subject: params.subject,
                    dataParser: subjectToDataParser(params.subject),
                };
            }
            return null;
        }),
        execute: async (args, error) => {
            if (self.children?.type === "subCommand") {
                for (const command of self.children.subCommands) {
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
            if (self.children?.type === "subject") {
                const hasMultiSubject = isMultiSubject(self.children.subject);
                if (!hasMultiSubject
                    && commandOptions.restArgs.length > 1) {
                    addIssue(error, {
                        type: "command",
                        expected: "exactly one subject argument",
                        received: commandOptions.restArgs,
                        message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
                    });
                    return SymbolCommandError;
                }
                const subjectInput = hasMultiSubject
                    ? commandOptions.restArgs
                    : commandOptions.restArgs[0];
                const subjectResult = self.children.dataParser.isAsynchronous()
                    ? await self.children.dataParser.asyncParse(subjectInput)
                    : self.children.dataParser.parse(subjectInput);
                if (EE.isLeft(subjectResult)) {
                    addIssueDataParser(error, unwrap(subjectResult), {
                        type: "subject",
                    });
                    return SymbolCommandError;
                }
                await execute({
                    options: commandOptions.options,
                    subject: unwrap(subjectResult),
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
            return void exitProcess(0);
        },
    });
    return self;
}

export { create, isCommand };
