'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var kind = require('../../../kind.cjs');

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
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

const checkerFileExistKind = kind.createDataParserKind("checker-file-exist");
class DataParserCheckerFileExist extends DDP__namespace.DataParserCheckerBase.init(checkerFileExistKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserCheckerFileExist);
    }
    isAsynchronous() {
        return true;
    }
    static execCheck(value, error, self, dataParser) {
        return utils.callThen(value.stat(), (fileStatResult) => {
            if (EE__namespace.isLeft(fileStatResult)) {
                return DDP__namespace.addIssue(error, "existing file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
            }
            const fileStat = utils.unwrap(fileStatResult);
            if (!fileStat.isFile) {
                return DDP__namespace.addIssue(error, "file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
            }
            return value;
        });
    }
    /**
     * {@include dataParser/file/checkers/exist/index.md}
     */
    static create(definition = {}) {
        return new DataParserCheckerFileExist(definition);
    }
}
const checkerFileExist = utils.detachObjectMethod(DataParserCheckerFileExist, "create");

exports.DataParserCheckerFileExist = DataParserCheckerFileExist;
exports.checkerFileExist = checkerFileExist;
exports.checkerFileExistKind = checkerFileExistKind;
