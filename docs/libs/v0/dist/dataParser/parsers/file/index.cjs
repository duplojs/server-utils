'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var kind = require('../../kind.cjs');
var fileInterface = require('../../../file/fileInterface.cjs');

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

const fileKind = kind.createDataParserKind("file");
class DataParserFile extends DDP__namespace.DataParserBase.init(fileKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserFile);
    }
    static execParse(self, data, error) {
        let fileInterface$1 = data;
        if (self.definition.coerce && typeof fileInterface$1 === "string") {
            fileInterface$1 = fileInterface.createFileInterface(fileInterface$1);
        }
        if (!fileInterface.isFileInterface(fileInterface$1)) {
            return DDP__namespace.addIssue(error, "file", data, self.definition.errorMessage);
        }
        return fileInterface$1;
    }
    static dataParserIsAsynchronous(self) {
        return false;
    }
    static prepareDefinition(definition) {
        return {
            ...definition,
            coerce: definition?.coerce ?? false,
            checkers: definition?.checkers ?? [],
            errorMessage: definition?.errorMessage,
        };
    }
    /**
     * {@include dataParser/file/index.md}
     */
    static create(definition) {
        return new DataParserFile(this.prepareDefinition(definition));
    }
}
const file = utils.detachObjectMethod(DataParserFile, "create");

exports.DataParserFile = DataParserFile;
exports.file = file;
exports.fileKind = fileKind;
