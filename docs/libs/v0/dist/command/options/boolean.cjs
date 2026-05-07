'use strict';

var base = require('./base.cjs');
var kind = require('../../kind.cjs');

const booleanOptionKind = kind.createDuplojsServerUtilsKind("command-boolean-option");
/**
 * {@include command/createBooleanOption/index.md}
 */
function createBooleanOption(name, params) {
    return booleanOptionKind.setTo({
        ...base.initOption(name, ({ isHere }) => isHere, params),
    });
}

exports.booleanOptionKind = booleanOptionKind;
exports.createBooleanOption = createBooleanOption;
