import { file as file$1 } from '../file/index.mjs';

function file(definition) {
    return file$1({
        ...definition,
        coerce: true,
    });
}

export { file };
