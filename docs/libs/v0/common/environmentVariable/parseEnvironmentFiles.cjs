'use strict';

var utils = require('@duplojs/utils');
var readTextFile = require('../../file/readTextFile.cjs');

const lineRegex = /^(?:export\s+)?(?<key>[A-Z_][A-Z0-9_]*)=(?<value>'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^\s#\r\n][^#\r\n]*|)\s*(?:#.*)?$/mg;
const endLineBreakerRegex = /\r\n?/mg;
const surroundingQuoteRegex = /^(['"`])([\s\S]*)\1$/mg;
const backCartRegex = /\\r/g;
const newLineRegex = /\\n/g;
function parseEnvironmentLine(line) {
    return utils.pipe(line, utils.S.replace(endLineBreakerRegex, "\n"), utils.S.extractAll(lineRegex), utils.G.reduce(utils.G.reduceFrom({}), ({ element, nextWithObject, lastValue, next }) => {
        if (element.namedGroups?.key && element.namedGroups?.value) {
            return nextWithObject(lastValue, {
                [element.namedGroups.key]: utils.pipe(element.namedGroups.value, (value) => {
                    const surroundingValue = utils.S.replace(value, surroundingQuoteRegex, "$2");
                    if (utils.S.startsWith(value, "\"")) {
                        return utils.pipe(surroundingValue, utils.S.replace(newLineRegex, "\n"), utils.S.replace(backCartRegex, "\r"));
                    }
                    return surroundingValue;
                }),
            });
        }
        return next(lastValue);
    }));
}
function parseEnvironmentFiles(baseEnv, paths) {
    return utils.G.asyncReduce(paths, utils.G.reduceFrom([baseEnv]), ({ lastValue, element, nextPush, exit }) => readTextFile.readTextFile(element)
        .then(utils.innerPipe(utils.E.whenIsRight(utils.innerPipe(parseEnvironmentLine, (value) => nextPush(lastValue, value))), utils.when(utils.E.isLeft, exit))));
}

exports.parseEnvironmentFiles = parseEnvironmentFiles;
exports.parseEnvironmentLine = parseEnvironmentLine;
