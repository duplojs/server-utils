import { unwrap } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { addIssue, addIssueDataParser } from './error.mjs';
import { specToDataParser } from './spec.mjs';

const argumentKind = createDuplojsServerUtilsKind("command-argument");
function createArgument(name, spec, params) {
    const dataParser = specToDataParser(spec);
    const self = argumentKind.setTo({
        name,
        spec,
        dataParser,
        description: params?.description,
        optional: params?.optional ?? false,
        execute: async (argument, error) => {
            if (self.optional === false && argument === undefined) {
                return addIssue(error, {
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
            if (EE.isLeft(result)) {
                return addIssueDataParser(error, unwrap(result), {
                    type: "argument",
                    target: name,
                });
            }
            return unwrap(result);
        },
    });
    return self;
}

export { argumentKind, createArgument };
