'use strict';

var file$1 = require('../file.cjs');

function file(params, definition) {
    return file$1.file(params, {
        ...definition,
        coerce: true,
    });
}

exports.file = file;
