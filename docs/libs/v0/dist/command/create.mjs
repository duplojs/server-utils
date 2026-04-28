import { unwrap, hasSomeKinds } from '@duplojs/utils';
import * as AA from '@duplojs/utils/array';
import * as GG from '@duplojs/utils/generator';
import * as OO from '@duplojs/utils/object';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import * as CC from '@duplojs/utils/clean';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { exitProcess } from '../common/exitProcess.mjs';
import { SymbolCommandError, addIssueDataParser, addIssue } from './error.mjs';
import { logCommandHelp } from './help.mjs';
import { createBooleanOption } from './options/boolean.mjs';
import { fileKind } from '../dataParser/parsers/file.mjs';

const commandKind = createDuplojsServerUtilsKind("command");
/**
 * @internal
 */
function isCommands(subject) {
    return subject instanceof Array
        && subject.length >= 1
        && AA.every(subject, commandKind.has);
}
function commandSubjectToDataParser(contract) {
    if (contract instanceof Array) {
        return DDP.tuple(AA.map(contract, (part) => commandSubjectToDataParser(part)));
    }
    if (hasSomeKinds(contract, [
        DDP.stringKind,
        DDP.numberKind,
        DDP.bigIntKind,
        DDP.dateKind,
        DDP.timeKind,
        DDP.nilKind,
        fileKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        return clone;
    }
    if (DDP.identifier(contract, DDP.arrayKind)) {
        return DDP.array(commandSubjectToDataParser(contract.definition.element), contract.definition);
    }
    if (DDP.identifier(contract, DDP.tupleKind)) {
        return DDP.tuple(contract.definition.shape.map((part) => commandSubjectToDataParser(part)), {
            ...contract.definition,
            rest: contract.definition.rest
                ? commandSubjectToDataParser(contract.definition.rest)
                : undefined,
        });
    }
    if (DDP.identifier(contract, DDP.dataParserKind)) {
        return contract;
    }
    return CC.toMapDataParser(contract, { coerce: true });
}
const helpOption = createBooleanOption("help", { aliases: ["h"] });
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
        execute: async (args, error) => {
            const commandError = error;
            const pathIndex = commandError.currentCommandPath.length;
            if (isCommands(self.subject)) {
                for (const command of self.subject) {
                    if (args[0] === command.name) {
                        commandError.currentCommandPath[pathIndex] = command.name;
                        return command.execute(AA.shift(args), commandError);
                    }
                }
            }
            const help = await helpOption.execute(args, commandError);
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
                const optionResult = await option.execute(lastValue.restArgs, commandError);
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
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (DDP.identifier(self.subject, DDP.arrayKind)
                || DDP.identifier(self.subject, DDP.tupleKind)) {
                const subjectResult = self.subject.isAsynchronous()
                    ? await self.subject.asyncParse(commandOptions.restArgs)
                    : self.subject.parse(commandOptions.restArgs);
                if (EE.isLeft(subjectResult)) {
                    addIssueDataParser(commandError, unwrap(subjectResult), {
                        type: "subject",
                    });
                    return SymbolCommandError;
                }
                await execute({
                    options: commandOptions.options,
                    subject: unwrap(subjectResult),
                });
            }
            else if (DDP.identifier(self.subject, DDP.dataParserKind)) {
                if (commandOptions.restArgs.length > 1) {
                    addIssue(commandError, {
                        type: "command",
                        expected: "exactly one subject argument",
                        received: commandOptions.restArgs,
                        message: `Expected exactly one subject argument, received ${commandOptions.restArgs.length}.`,
                    });
                    return SymbolCommandError;
                }
                const subjectResult = self.subject.isAsynchronous()
                    ? await self.subject.asyncParse(commandOptions.restArgs[0])
                    : self.subject.parse(commandOptions.restArgs[0]);
                if (EE.isLeft(subjectResult)) {
                    addIssueDataParser(commandError, unwrap(subjectResult), {
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
                await execute({});
            }
            return void exitProcess(0);
        },
    });
    return self;
}

export { create, isCommands };
