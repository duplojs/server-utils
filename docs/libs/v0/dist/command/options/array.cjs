'use strict';

var utils = require('@duplojs/utils');
var SS = require('@duplojs/utils/string');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var base = require('./base.cjs');
var error = require('../error.cjs');
var spec = require('../spec.cjs');
var kind = require('../../kind.cjs');

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

const defaultSeparator = ",";
const arrayOptionKind = kind.createDuplojsServerUtilsKind("command-array-option");
function createArrayOption(name, spec$1, params) {
    const dataParser = utils.pipe(spec$1, spec.specToDataParser, DDP__namespace.array, (parser) => params?.min
        ? parser.addChecker(DDP__namespace.checkerArrayMin(params.min))
        : parser, (parser) => params?.max
        ? parser.addChecker(DDP__namespace.checkerArrayMax(params.max))
        : parser);
    const self = arrayOptionKind.setTo({
        spec: spec$1,
        dataParser,
        required: params?.required ?? false,
        min: params?.min,
        max: params?.max,
        separator: params?.separator ?? defaultSeparator,
        ...base.initOption(name, async ({ isHere, value }, error$1) => {
            if (!isHere && self.required === true) {
                return error.addIssue(error$1, {
                    type: "option",
                    target: name,
                    expected: `required option --${name}`,
                    received: value,
                    message: `Option "${name}" is required.`,
                });
            }
            if (!isHere && self.required === false) {
                return undefined;
            }
            const values = value !== undefined
                ? SS__namespace.split(value, self.separator)
                : undefined;
            const result = dataParser.isAsynchronous()
                ? await dataParser.asyncParse(values)
                : dataParser.parse(values);
            if (EE__namespace.isLeft(result)) {
                return error.addIssueDataParser(error$1, utils.unwrap(result), {
                    type: "option",
                    target: name,
                });
            }
            return utils.unwrap(result);
        }, {
            description: params?.description,
            aliases: params?.aliases,
            hasValue: true,
        }),
    });
    return self;
}

exports.arrayOptionKind = arrayOptionKind;
exports.createArrayOption = createArrayOption;
