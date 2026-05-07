import { unwrap } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { initOption } from './base.mjs';
import { addIssue, addIssueDataParser } from '../error.mjs';
import { specToDataParser } from '../spec.mjs';
import { createDuplojsServerUtilsKind } from '../../kind.mjs';

const simpleOptionKind = createDuplojsServerUtilsKind("command-simple-option");
function createOption(name, spec, params) {
    const dataParser = specToDataParser(spec);
    const self = simpleOptionKind.setTo({
        spec,
        dataParser,
        required: params?.required ?? false,
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
            const result = dataParser.isAsynchronous()
                ? await dataParser.asyncParse(value)
                : dataParser.parse(value);
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

export { createOption, simpleOptionKind };
