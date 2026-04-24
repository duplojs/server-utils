'use strict';

var utils = require('@duplojs/utils');
var GG = require('@duplojs/utils/generator');
var SS = require('@duplojs/utils/string');
var EE = require('@duplojs/utils/either');
var readTextFile = require('../../file/readTextFile.cjs');

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

var GG__namespace = /*#__PURE__*/_interopNamespaceDefault(GG);
var SS__namespace = /*#__PURE__*/_interopNamespaceDefault(SS);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

const lineRegex = /^(?:export\s+)?(?<key>[A-Z_][A-Z0-9_]*)=(?<value>'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^\s#\r\n][^#\r\n]*|)\s*(?:#.*)?$/mg;
const endLineBreakerRegex = /\r\n?/mg;
const surroundingQuoteRegex = /^(['"`])([\s\S]*)\1$/mg;
const backCartRegex = /\\r/g;
const newLineRegex = /\\n/g;
function parseEnvironmentLine(line) {
    return utils.pipe(line, SS__namespace.replace(endLineBreakerRegex, "\n"), SS__namespace.extractAll(lineRegex), GG__namespace.reduce(GG__namespace.reduceFrom({}), ({ element, nextWithObject, lastValue, next }) => {
        if (element.namedGroups?.key && element.namedGroups?.value) {
            return nextWithObject(lastValue, {
                [element.namedGroups.key]: utils.pipe(element.namedGroups.value, (value) => {
                    const surroundingValue = SS__namespace.replace(value, surroundingQuoteRegex, "$2");
                    if (SS__namespace.startsWith(value, "\"")) {
                        return utils.pipe(surroundingValue, SS__namespace.replace(newLineRegex, "\n"), SS__namespace.replace(backCartRegex, "\r"));
                    }
                    return surroundingValue;
                }),
            });
        }
        return next(lastValue);
    }));
}
function parseEnvironmentFiles(baseEnv, paths) {
    return GG__namespace.asyncReduce(paths, GG__namespace.reduceFrom([baseEnv]), ({ lastValue, element, nextPush, exit }) => readTextFile.readTextFile(element)
        .then(utils.innerPipe(EE__namespace.whenIsRight(utils.innerPipe(parseEnvironmentLine, (value) => nextPush(lastValue, value))), utils.when(EE__namespace.isLeft, exit))));
}

exports.parseEnvironmentFiles = parseEnvironmentFiles;
exports.parseEnvironmentLine = parseEnvironmentLine;
