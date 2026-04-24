'use strict';

var utils = require('@duplojs/utils');
var SS = require('@duplojs/utils/string');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var CC = require('@duplojs/utils/clean');
var base = require('./base.cjs');
var error = require('../error.cjs');

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

var SS__namespace = /*#__PURE__*/_interopNamespaceDefault(SS);
var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);
var CC__namespace = /*#__PURE__*/_interopNamespaceDefault(CC);

const defaultSeparator = ",";
function createArrayOption(name, contract, params) {
    let computeDataParser = undefined;
    if (utils.hasSomeKinds(contract, [
        DDP__namespace.stringKind,
        DDP__namespace.numberKind,
        DDP__namespace.bigIntKind,
        DDP__namespace.dateKind,
        DDP__namespace.timeKind,
        DDP__namespace.nilKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        computeDataParser = clone;
    }
    else if (DDP__namespace.identifier(contract, DDP__namespace.dataParserKind)) {
        computeDataParser = contract;
    }
    else {
        computeDataParser = CC__namespace.toMapDataParser(contract, { coerce: true });
    }
    const dataParser = utils.pipe(computeDataParser, DDP__namespace.array, (schema) => params?.min
        ? schema.addChecker(DDP__namespace.checkerArrayMin(params.min))
        : schema, (schema) => params?.max
        ? schema.addChecker(DDP__namespace.checkerArrayMax(params.max))
        : schema, (schema) => params?.required
        ? schema
        : DDP__namespace.optional(schema));
    return base.initOption(name, ({ isHere, value }, error$1) => {
        if (!isHere && params?.required) {
            return error.addIssue(error$1, {
                type: "option",
                target: name,
                expected: `required option --${name}`,
                received: value,
                message: `Option "${name}" is required.`,
            });
        }
        const values = value !== undefined
            ? SS__namespace.split(value, params?.separator ?? defaultSeparator)
            : undefined;
        const result = dataParser.parse(values);
        if (EE__namespace.isLeft(result)) {
            return error.addDataParserError(error$1, utils.unwrap(result), {
                type: "option",
                target: name,
            });
        }
        return utils.unwrap(result);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

exports.createArrayOption = createArrayOption;
