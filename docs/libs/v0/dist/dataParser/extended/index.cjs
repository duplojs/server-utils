'use strict';

var index = require('./coerce/index.cjs');
var file = require('./file.cjs');



exports.coerce = index;
exports.DataParserFileExtended = file.DataParserFileExtended;
exports.file = file.file;
