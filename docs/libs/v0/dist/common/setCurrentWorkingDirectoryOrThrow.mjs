import { kindHeritage } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { setCurrentWorkingDirectory } from './setCurrentWorkingDirectory.mjs';

class SetCurrentWorkingDirectoryError extends kindHeritage("set-working-directory-error", createDuplojsServerUtilsKind("set-working-directory-error"), Error) {
    constructor() {
        super({}, ["Failed to set current working directory"]);
    }
}
/**
 * {@include common/setCurrentWorkingDirectoryOrThrow/index.md}
 */
function setCurrentWorkingDirectoryOrThrow(path) {
    const result = setCurrentWorkingDirectory(path);
    if (EE.isLeft(result)) {
        throw new SetCurrentWorkingDirectoryError();
    }
    return;
}

export { SetCurrentWorkingDirectoryError, setCurrentWorkingDirectoryOrThrow };
