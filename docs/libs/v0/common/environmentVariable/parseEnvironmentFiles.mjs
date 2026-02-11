import { G, innerPipe, E, when, pipe, S } from '@duplojs/utils';
import { readTextFile } from '../../file/readTextFile.mjs';

const lineRegex = /^(?:export\s+)?(?<key>[A-Z_][A-Z0-9_]*)=(?<value>'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^\s#\r\n][^#\r\n]*|)\s*(?:#.*)?$/mg;
const endLineBreakerRegex = /\r\n?/mg;
const surroundingQuoteRegex = /^(['"`])([\s\S]*)\1$/mg;
const backCartRegex = /\\r/g;
const newLineRegex = /\\n/g;
function parseEnvironmentLine(line) {
    return pipe(line, S.replace(endLineBreakerRegex, "\n"), S.extractAll(lineRegex), G.reduce(G.reduceFrom({}), ({ element, nextWithObject, lastValue, next }) => {
        if (element.namedGroups?.key && element.namedGroups?.value) {
            return nextWithObject(lastValue, {
                [element.namedGroups.key]: pipe(element.namedGroups.value, (value) => {
                    const surroundingValue = S.replace(value, surroundingQuoteRegex, "$2");
                    if (S.startsWith(value, "\"")) {
                        return pipe(surroundingValue, S.replace(newLineRegex, "\n"), S.replace(backCartRegex, "\r"));
                    }
                    return surroundingValue;
                }),
            });
        }
        return next(lastValue);
    }));
}
function parseEnvironmentFiles(baseEnv, paths) {
    return G.asyncReduce(paths, G.reduceFrom([baseEnv]), ({ lastValue, element, nextPush, exit }) => readTextFile(element)
        .then(innerPipe(E.whenIsRight(innerPipe(parseEnvironmentLine, (value) => nextPush(lastValue, value))), when(E.isLeft, exit))));
}

export { parseEnvironmentFiles, parseEnvironmentLine };
