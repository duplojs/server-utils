'use strict';

var utils = require('@duplojs/utils');
var file$1 = require('../parsers/file.cjs');

/**
 * {@include dataParserExtended/file/index.md}
 */
function file(params, definition) {
    const self = utils.DP.dataParserExtendedInit(file$1.file(params, definition), {
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
