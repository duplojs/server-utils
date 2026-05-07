import { initOption } from './base.mjs';
import { createDuplojsServerUtilsKind } from '../../kind.mjs';

const booleanOptionKind = createDuplojsServerUtilsKind("command-boolean-option");
/**
 * {@include command/createBooleanOption/index.md}
 */
function createBooleanOption(name, params) {
    return booleanOptionKind.setTo({
        ...initOption(name, ({ isHere }) => isHere, params),
    });
}

export { booleanOptionKind, createBooleanOption };
