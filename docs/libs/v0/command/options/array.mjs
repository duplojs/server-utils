import { pipe, DP, S } from '@duplojs/utils';
import { initOption } from './base.mjs';
import { CommandOptionRequiredError } from '../errors.mjs';

const defaultSeparator = ",";
function createArrayOption(name, schema, params) {
    const dataParser = pipe(schema, DP.array, (schema) => params?.min
        ? schema.addChecker(DP.checkerArrayMin(params.min))
        : schema, (schema) => params?.max
        ? schema.addChecker(DP.checkerArrayMax(params.max))
        : schema, (schema) => params?.required
        ? schema
        : DP.optional(schema));
    return initOption(name, ({ isHere, value }) => {
        if (!isHere && params?.required) {
            throw new CommandOptionRequiredError(name);
        }
        const values = value !== undefined
            ? S.split(value, params?.separator ?? defaultSeparator)
            : undefined;
        return dataParser.parseOrThrow(values);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

export { createArrayOption };
