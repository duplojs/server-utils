import { unwrap, hasSomeKinds } from '@duplojs/utils';
import * as AA from '@duplojs/utils/array';
import * as OO from '@duplojs/utils/object';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import * as CC from '@duplojs/utils/clean';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { exitProcess } from '../common/exitProcess.mjs';
import { createError, setErrorPath, popErrorPath, SymbolCommandError, addDataParserError, addIssue, interpretCommandError } from './error.mjs';
import { logCommandHelp } from './help.mjs';
import { createBooleanOption } from './options/boolean.mjs';

function commandSubjectToDataParser(contract) {
    if (hasSomeKinds(contract, [
        DDP.stringKind,
        DDP.numberKind,
        DDP.bigIntKind,
        DDP.dateKind,
        DDP.timeKind,
        DDP.nilKind,
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
function printError(commandError, error) {
    if (!error) {
        // eslint-disable-next-line no-console
        console.error(interpretCommandError(commandError));
        exitProcess(1);
    }
    return SymbolCommandError;
}
const commandKind = createDuplojsServerUtilsKind("command");
const helpOption = createBooleanOption("help", { aliases: ["h"] });
function create(...args) {
    const [name, params, execute] = args.length === 2
        ? [args[0], {}, args[1]]
        : args;
    const subject = (params.subject
        && !(params.subject instanceof Array)
        ? commandSubjectToDataParser(params.subject)
        : params.subject) ?? null;
    const self = commandKind.setTo({
        name,
        description: params.description ?? null,
        options: params.options ?? [],
        subject: subject,
        execute: async (args, error) => {
            const commandError = error ?? createError(self.name);
            const pathIndex = commandError.currentCommandPath.length;
            if (self.subject instanceof Array) {
                for (const command of self.subject) {
                    if (args[0] === command.name) {
                        let result = undefined;
                        setErrorPath(commandError, command.name, pathIndex);
                        try {
                            result = await command.execute(AA.shift(args), commandError);
                        }
                        finally {
                            popErrorPath(commandError);
                        }
                        if (result === SymbolCommandError) {
                            return printError(commandError, error);
                        }
                        return result;
                    }
                }
            }
            const help = helpOption.execute(args, commandError);
            if (help === SymbolCommandError) {
                return printError(commandError, error);
            }
            else if (help.result) {
                logCommandHelp(self);
                return void exitProcess(0);
            }
            const commandOptions = AA.reduce(self.options, AA.reduceFrom({
                options: {},
                restArgs: args,
            }), ({ element: option, lastValue, next, exit }) => {
                const optionResult = option.execute(lastValue.restArgs, commandError);
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
                return printError(commandError, error);
            }
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (DDP.identifier(self.subject, DDP.arrayKind)
                || DDP.identifier(self.subject, DDP.tupleKind)) {
                const subjectResult = self.subject.parse(commandOptions.restArgs);
                if (EE.isLeft(subjectResult)) {
                    addDataParserError(commandError, unwrap(subjectResult), {
                        type: "subject",
                    });
                    return printError(commandError, error);
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
                    return printError(commandError, error);
                }
                const subjectResult = self.subject.parse(commandOptions.restArgs[0]);
                if (EE.isLeft(subjectResult)) {
                    addDataParserError(commandError, unwrap(subjectResult), {
                        type: "subject",
                    });
                    return printError(commandError, error);
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

export { create };
