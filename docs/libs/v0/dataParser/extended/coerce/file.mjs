import { file as file$1 } from '../file.mjs';

function file(params, definition) {
    return file$1(params, {
        ...definition,
        coerce: true,
    });
}

export { file };
