'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var AA = require('@duplojs/utils/array');
var CC = require('@duplojs/utils/clean');
var file = require('../../dataParser/parsers/file.cjs');

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
var AA__namespace = /*#__PURE__*/_interopNamespaceDefault(AA);
var CC__namespace = /*#__PURE__*/_interopNamespaceDefault(CC);

function subjectToDataParser(contract) {
    if (utils.hasSomeKinds(contract, [
        DDP__namespace.numberKind,
        DDP__namespace.bigIntKind,
        DDP__namespace.dateKind,
        DDP__namespace.timeKind,
        DDP__namespace.nilKind,
        file.fileKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        return clone;
    }
    else if (DDP__namespace.identifier(contract, DDP__namespace.arrayKind)) {
        return DDP__namespace.array(subjectToDataParser(contract.definition.element), contract.definition);
    }
    else if (DDP__namespace.identifier(contract, DDP__namespace.tupleKind)) {
        return DDP__namespace.tuple(AA__namespace.mapTuple(contract.definition.shape, (part) => subjectToDataParser(part)), {
            ...contract.definition,
            rest: contract.definition.rest
                ? subjectToDataParser(contract.definition.rest)
                : undefined,
        });
    }
    else if (contract instanceof Array) {
        return DDP__namespace.tuple(AA__namespace.mapTuple(contract, subjectToDataParser));
    }
    else if (utils.hasSomeKinds(contract, [
        DDP__namespace.unionKind,
        DDP__namespace.pipeKind,
        DDP__namespace.optionalKind,
        DDP__namespace.literalKind,
        DDP__namespace.transformKind,
        DDP__namespace.templateLiteralKind,
        DDP__namespace.stringKind,
    ])) {
        return contract;
    }
    else {
        return CC__namespace.toMapDataParser(contract, { coerce: true });
    }
}
function isMultiSubject(subject) {
    return subject instanceof Array
        || utils.hasSomeKinds(subject, [
            DDP__namespace.tupleKind,
            DDP__namespace.arrayKind,
            CC__namespace.entityPropertyArrayKind,
        ]);
}

exports.isMultiSubject = isMultiSubject;
exports.subjectToDataParser = subjectToDataParser;
