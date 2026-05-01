'use strict';

var base = require('./base.cjs');

/**
 * {@include command/createBooleanOption/index.md}
 */
function createBooleanOption(name, params) {
    return base.initOption(name, ({ isHere }) => isHere, params);
}

exports.createBooleanOption = createBooleanOption;
