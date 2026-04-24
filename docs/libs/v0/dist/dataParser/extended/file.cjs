'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var file$1 = require('../parsers/file.cjs');

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

/**
 * {@include dataParserExtended/file/index.md}
 */
function file(params, definition) {
    const self = DDP__namespace.dataParserExtendedInit(file$1.file(params, definition), {
        mimeType(self, value) {
            return file({
                mimeType: value,
                minSize: self.definition.minSize,
                maxSize: self.definition.maxSize,
                checkExist: self.definition.checkExist,
            }, {
                checkers: self.definition.checkers,
                errorMessage: self.definition.errorMessage,
                coerce: self.definition.coerce,
            });
        },
        minSize(self, value) {
            return file({
                mimeType: self.definition.mimeType,
                minSize: value,
                maxSize: self.definition.maxSize,
                checkExist: self.definition.checkExist,
            }, {
                checkers: self.definition.checkers,
                errorMessage: self.definition.errorMessage,
                coerce: self.definition.coerce,
            });
        },
        maxSize(self, value) {
            return file({
                mimeType: self.definition.mimeType,
                minSize: self.definition.minSize,
                maxSize: value,
                checkExist: self.definition.checkExist,
            }, {
                checkers: self.definition.checkers,
                errorMessage: self.definition.errorMessage,
                coerce: self.definition.coerce,
            });
        },
        mustExist(self) {
            return file({
                mimeType: self.definition.mimeType,
                minSize: self.definition.minSize,
                maxSize: self.definition.maxSize,
                checkExist: true,
            }, {
                checkers: self.definition.checkers,
                errorMessage: self.definition.errorMessage,
                coerce: self.definition.coerce,
            });
        },
    }, file.overrideHandler);
    return self;
}
file.overrideHandler = utils.createOverride("@duplojs/utils/data-parser-extended/bigint");

exports.file = file;
