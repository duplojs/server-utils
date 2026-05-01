import { create } from './create/index.mjs';
import { createError, SymbolCommandError, interpretCommandError } from './error.mjs';
import { getProcessArguments } from '../common/getProcessArguments.mjs';
import { exitProcess } from '../common/exitProcess.mjs';

async function exec(...args) {
    const [params, execute] = args.length === 1
        ? [{}, args[0]]
        : args;
    const error = createError("root");
    const result = await create("root", params, execute).execute(getProcessArguments(), error);
    if (result === SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(interpretCommandError(error));
        return void exitProcess(1);
    }
}

export { exec };
