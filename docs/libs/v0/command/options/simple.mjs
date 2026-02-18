import { DP } from '@duplojs/utils';
import { initOption } from './base.mjs';
import { CommandOptionRequiredError } from '../errors.mjs';

function createOption(name, schema, params) {
    const dataParser = params?.required
        ? schema
        : DP.optional(schema);
    return initOption(name, ({ isHere, value }) => {
        if (!isHere && params?.required) {
            throw new CommandOptionRequiredError(name);
        }
        return dataParser.parseOrThrow(value);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

export { createOption };
