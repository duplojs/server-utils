import * as AA from '@duplojs/utils/array';
import * as OO from '@duplojs/utils/object';
import { createError, SymbolCommandError, interpretExecOptionError } from './error.mjs';
import { logExecOptionHelp } from './help.mjs';
import { exitProcess } from '../common/exitProcess.mjs';
import { getProcessArguments } from '../common/getProcessArguments.mjs';
import { createBooleanOption } from './options/boolean.mjs';

const helpOption = createBooleanOption("help", { aliases: ["h"] });
function execOptions(...options) {
    const processArguments = getProcessArguments();
    const error = createError("root");
    const help = helpOption.execute(processArguments, error);
    if (help === SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(interpretExecOptionError(error));
        return void exitProcess(1);
    }
    else if (help.result) {
        logExecOptionHelp(options);
        return void exitProcess(0);
    }
    const result = AA.reduce(options, AA.reduceFrom({
        options: {},
        restArgs: processArguments,
    }), ({ element: option, lastValue, next, exit }) => {
        const optionResult = option.execute(lastValue.restArgs, error);
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
    if (result === SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(interpretExecOptionError(error));
        return void exitProcess(1);
    }
    return result.options;
}

export { execOptions };
