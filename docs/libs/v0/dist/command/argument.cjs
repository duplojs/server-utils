'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var error = require('./error.cjs');
var spec = require('./spec.cjs');

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

const argumentKind = kind.createDuplojsServerUtilsKind("command-argument");
function createArgument(name, spec$1, params) {
    const dataParser = spec.specToDataParser(spec$1);
    const self = argumentKind.setTo({
        name,
        spec: spec$1,
        dataParser,
        description: params?.description,
        optional: params?.optional ?? false,
        execute: async (argument, error$1) => {
            if (self.optional === false && argument === undefined) {
                return error.addIssue(error$1, {
                    type: "argument",
                    target: name,
                    expected: `required argument ${name}`,
                    received: argument,
                    message: `Argument "${name}" is required.`,
                });
            }
            if (self.optional === true && argument === undefined) {
                return undefined;
            }
            const result = dataParser.isAsynchronous()
                ? await dataParser.asyncParse(argument)
                : dataParser.parse(argument);
            if (EE__namespace.isLeft(result)) {
                return error.addIssueDataParser(error$1, utils.unwrap(result), {
                    type: "argument",
                    target: name,
                });
            }
            return utils.unwrap(result);
        },
    });
    return self;
}

exports.argumentKind = argumentKind;
exports.createArgument = createArgument;
