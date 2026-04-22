import { pipe, unwrap } from '@duplojs/utils';
import * as SS from '@duplojs/utils/string';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import { initOption } from './base.mjs';
import { addIssue, addDataParserError } from '../error.mjs';

const defaultSeparator = ",";
function createArrayOption(name, schema, params) {
    const dataParser = pipe(schema, DDP.array, (schema) => params?.min
        ? schema.addChecker(DDP.checkerArrayMin(params.min))
        : schema, (schema) => params?.max
        ? schema.addChecker(DDP.checkerArrayMax(params.max))
        : schema, (schema) => params?.required
        ? schema
        : DDP.optional(schema));
    return initOption(name, ({ isHere, value }, error) => {
        if (!isHere && params?.required) {
            return addIssue(error, {
                type: "option",
                target: name,
                expected: `required option --${name}`,
                received: value,
                message: `Option "${name}" is required.`,
            });
        }
        const values = value !== undefined
            ? SS.split(value, params?.separator ?? defaultSeparator)
            : undefined;
        const result = dataParser.parse(values);
        if (EE.isLeft(result)) {
            return addDataParserError(error, unwrap(result), {
                type: "option",
                target: name,
            });
        }
        return unwrap(result);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

export { createArrayOption };
