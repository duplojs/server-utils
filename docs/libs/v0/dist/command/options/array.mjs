import { pipe, unwrap } from '@duplojs/utils';
import * as SS from '@duplojs/utils/string';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import { initOption } from './base.mjs';
import { addIssue, addIssueDataParser } from '../error.mjs';
import { specToDataParser } from '../spec.mjs';
import { createDuplojsServerUtilsKind } from '../../kind.mjs';

const defaultSeparator = ",";
const arrayOptionKind = createDuplojsServerUtilsKind("command-array-option");
function createArrayOption(name, spec, params) {
    const dataParser = pipe(spec, specToDataParser, DDP.array, (parser) => params?.min
        ? parser.addChecker(DDP.checkerArrayMin(params.min))
        : parser, (parser) => params?.max
        ? parser.addChecker(DDP.checkerArrayMax(params.max))
        : parser);
    const self = arrayOptionKind.setTo({
        spec,
        dataParser,
        required: params?.required ?? false,
        min: params?.min,
        max: params?.max,
        separator: params?.separator ?? defaultSeparator,
        ...initOption(name, async ({ isHere, value }, error) => {
            if (!isHere && self.required === true) {
                return addIssue(error, {
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
                ? SS.split(value, self.separator)
                : undefined;
            const result = dataParser.isAsynchronous()
                ? await dataParser.asyncParse(values)
                : dataParser.parse(values);
            if (EE.isLeft(result)) {
                return addIssueDataParser(error, unwrap(result), {
                    type: "option",
                    target: name,
                });
            }
            return unwrap(result);
        }, {
            description: params?.description,
            aliases: params?.aliases,
            hasValue: true,
        }),
    });
    return self;
}

export { arrayOptionKind, createArrayOption };
