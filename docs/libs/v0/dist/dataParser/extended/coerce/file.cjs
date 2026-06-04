'use strict';

var file$1 = require('../file.cjs');

function file(definition) {
    return file$1.file({
        ...definition,
        coerce: true,
    });
}

exports.file = file;
