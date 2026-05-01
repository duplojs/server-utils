import { initOption } from './base.mjs';

/**
 * {@include command/createBooleanOption/index.md}
 */
function createBooleanOption(name, params) {
    return initOption(name, ({ isHere }) => isHere, params);
}

export { createBooleanOption };
