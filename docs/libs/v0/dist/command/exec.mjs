import { create } from './create.mjs';
import { getProcessArguments } from '../common/getProcessArguments.mjs';

async function exec(...args) {
    const [params, execute] = args.length === 1
        ? [{}, args[0]]
        : args;
    await create("root", params, execute).execute(getProcessArguments());
}

export { exec };
