'use strict';

var utils = require('@duplojs/utils');

const createDataParserKind = utils.createKindNamespace(
// @ts-expect-error reserved kind namespace
"DuplojsServerUtilsDataParser");

exports.createDataParserKind = createDataParserKind;
