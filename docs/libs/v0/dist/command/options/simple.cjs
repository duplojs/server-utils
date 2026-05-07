'use strict';

var utils = require('@duplojs/utils');
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

var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

const simpleOptionKind = kind.createDuplojsServerUtilsKind("command-simple-option");
function createOption(name, spec$1, params) {
    const dataParser = spec.specToDataParser(spec$1);
    const self = simpleOptionKind.setTo({
        spec: spec$1,
        dataParser,
        required: params?.required ?? false,
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
            const result = dataParser.isAsynchronous()
                ? await dataParser.asyncParse(value)
                : dataParser.parse(value);
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

exports.createOption = createOption;
exports.simpleOptionKind = simpleOptionKind;
