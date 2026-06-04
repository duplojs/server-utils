'use strict';

var index = require('../file/index.cjs');

function file(definition) {
    return index.file({
        ...definition,
        coerce: true,
    });
}

exports.file = file;
