import { file as file$1 } from '../file.mjs';

function file(definition) {
    return file$1({
        ...definition,
        coerce: true,
    });
}

export { file };
