'use strict';

var utils = require('@duplojs/utils');

const createDuplojsServerUtilsKind = utils.createKindNamespace(
// @ts-expect-error reserved kind namespace
"DuplojsServerUtils");

exports.createDuplojsServerUtilsKind = createDuplojsServerUtilsKind;
