import { unwrap } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import * as DDP from '@duplojs/utils/dataParser';
import { initOption } from './base.mjs';
import { addIssue, addDataParserError } from '../error.mjs';

function createOption(name, schema, params) {
    const dataParser = params?.required
        ? schema
        : DDP.optional(schema);
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
        const result = dataParser.parse(value);
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

export { createOption };
