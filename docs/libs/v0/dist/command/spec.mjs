import * as DDP from '@duplojs/utils/dataParser';
import * as CC from '@duplojs/utils/clean';
import { hasSomeKinds } from '@duplojs/utils';
import { fileKind } from '../dataParser/parsers/file.mjs';

function specToDataParser(value) {
    if (hasSomeKinds(value, [
        DDP.stringKind,
        DDP.numberKind,
        DDP.bigIntKind,
        DDP.dateKind,
        DDP.timeKind,
        DDP.nilKind,
        fileKind,
    ])) {
        const clone = value.clone();
        clone.definition.coerce = true;
        return clone;
    }
    else if (DDP.identifier(value, DDP.dataParserKind)) {
        return value;
    }
    else {
        return CC.toMapDataParser(value, { coerce: true });
    }
}

export { specToDataParser };
