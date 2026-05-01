'use strict';

var index = require('./extended/index.cjs');
var index$1 = require('./parsers/coerce/index.cjs');
var file = require('./parsers/file.cjs');



exports.extended = index;
exports.coerce = index$1;
exports.file = file.file;
exports.fileKind = file.fileKind;
