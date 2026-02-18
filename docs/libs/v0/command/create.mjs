import { A, O, DP } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { logHelp } from './help.mjs';
import { CommandManyArgumentsError } from './errors.mjs';
import { createBooleanOption } from './options/boolean.mjs';
import { exitProcess } from '../common/exitProcess.mjs';

const commandKind = createDuplojsServerUtilsKind("command");
const helpOption = createBooleanOption("help", { aliases: ["h"] });
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
                        await command.execute(A.shift(args));
                        return;
                    }
                }
            }
            const help = helpOption.execute(args);
            if (help.result) {
                logHelp(self);
                exitProcess(0);
                return;
            }
            const commandOptions = A.reduce(self.options, A.reduceFrom({
                options: {},
                restArgs: args,
            }), ({ element: option, lastValue, next }) => {
                const optionResult = option.execute(lastValue.restArgs);
                return next({
                    options: O.override(lastValue.options, {
                        [option.name]: optionResult.result,
                    }),
                    restArgs: optionResult.argumentRest,
                });
            });
            if (self.subject === null) {
                await execute({ options: commandOptions.options });
            }
            else if (DP.identifier(self.subject, DP.arrayKind)
                || DP.identifier(self.subject, DP.tupleKind)) {
                await execute({
                    options: commandOptions.options,
                    subject: self.subject.parseOrThrow(commandOptions.restArgs),
                });
            }
            else if (DP.identifier(self.subject, DP.dataParserKind)) {
                if (commandOptions.restArgs.length !== 1) {
                    throw new CommandManyArgumentsError(commandOptions.restArgs.length);
                }
                await execute({
                    options: commandOptions.options,
                    subject: self.subject.parseOrThrow(commandOptions.restArgs),
                });
            }
            else {
                await execute({});
            }
            exitProcess(0);
            return;
        },
    });
    return self;
}

export { create };
