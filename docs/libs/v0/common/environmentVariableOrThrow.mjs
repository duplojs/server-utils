import { kindHeritage, unwrap } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { environmentVariable } from './environmentVariable/index.mjs';

class EnvironmentVariableError extends kindHeritage("environment-variable-error", createDuplojsServerUtilsKind("environment-variable-error"), Error) {
    error;
    constructor(error) {
        super({}, ["Failed to load environment variables: one env file could not be read or parsed values do not match the provided schema."]);
        this.error = error;
    }
}
/**
 * {@include common/environmentVariableOrThrow/index.md}
 */
async function environmentVariableOrThrow(shape, params) {
    const result = await environmentVariable(shape, params);
    if (EE.isLeft(result)) {
        throw new EnvironmentVariableError(result);
    }
    return unwrap(result);
}

export { EnvironmentVariableError, environmentVariableOrThrow };
