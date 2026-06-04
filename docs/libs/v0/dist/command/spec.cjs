'use strict';

var DDP = require('@duplojs/utils/dataParser');
var CC = require('@duplojs/utils/clean');
var utils = require('@duplojs/utils');
var index = require('../dataParser/parsers/file/index.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);
var CC__namespace = /*#__PURE__*/_interopNamespaceDefault(CC);

function specToDataParser(value) {
    if (utils.hasSomeKinds(value, [
        DDP__namespace.stringKind,
        DDP__namespace.numberKind,
        DDP__namespace.bigIntKind,
        DDP__namespace.dateKind,
        DDP__namespace.timeKind,
        DDP__namespace.nilKind,
        index.fileKind,
    ])) {
        const clone = value.clone();
        clone.definition.coerce = true;
        return clone;
    }
    else if (DDP__namespace.identifier(value, DDP__namespace.dataParserKind)) {
        return value;
    }
    else {
        return CC__namespace.toMapDataParser(value, { coerce: true });
    }
}

exports.specToDataParser = specToDataParser;
