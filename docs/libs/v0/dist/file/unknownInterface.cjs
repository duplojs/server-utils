'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var stat = require('./stat.cjs');
var exists = require('./exists.cjs');

const unknownInterfaceKind = kind.createDuplojsServerUtilsKind("unknownInterface");
/**
 * {@include file/createUnknownInterface/index.md}
 */
function createUnknownInterface(path) {
    function getName() {
        return utils.Path.getBaseName(path);
    }
    function getParentPath() {
        return utils.Path.getParentFolderPath(path);
    }
    function localStat() {
        return stat.stat(path);
    }
    function exist() {
        return exists.exists(path);
    }
    return unknownInterfaceKind.addTo({
        path,
        getName,
        getParentPath,
        stat: localStat,
        exist,
    });
}
/**
 * {@include file/isUnknownInterface/index.md}
 */
function isUnknownInterface(input) {
    return unknownInterfaceKind.has(input);
}

exports.createUnknownInterface = createUnknownInterface;
exports.isUnknownInterface = isUnknownInterface;
