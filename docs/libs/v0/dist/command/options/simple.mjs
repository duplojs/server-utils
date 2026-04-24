import { hasSomeKinds, unwrap } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import * as CC from '@duplojs/utils/clean';
import { initOption } from './base.mjs';
import { addIssue, addDataParserError } from '../error.mjs';

function createOption(name, contract, params) {
    let computeDataParser = undefined;
    if (hasSomeKinds(contract, [
        DDP.stringKind,
        DDP.numberKind,
        DDP.bigIntKind,
        DDP.dateKind,
        DDP.timeKind,
        DDP.nilKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        computeDataParser = clone;
    }
    else if (DDP.identifier(contract, DDP.dataParserKind)) {
        computeDataParser = contract;
    }
    else {
        computeDataParser = CC.toMapDataParser(contract, { coerce: true });
    }
    const dataParser = params?.required
        ? computeDataParser
        : DDP.optional(computeDataParser);
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
