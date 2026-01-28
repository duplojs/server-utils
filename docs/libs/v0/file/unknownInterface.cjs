'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var stat = require('./stat.cjs');
var exists = require('./exists.cjs');

const unknownInterfaceKind = kind.createDuplojsServerUtilsKind("unknownInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createUnknownInterface(path) {
    const localPath = utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), utils.when(utils.S.endsWith("/"), utils.S.slice(0, -1)));
    const name = utils.pipe(localPath, utils.S.split("/"), utils.A.last, utils.when(utils.isType("undefined"), utils.justReturn("")));
    function getParentPath() {
        return utils.S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localStat() {
        return stat.stat(localPath);
    }
    function exist() {
        return exists.exists(localPath);
    }
    return unknownInterfaceKind.addTo({
        path: localPath,
        name,
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
