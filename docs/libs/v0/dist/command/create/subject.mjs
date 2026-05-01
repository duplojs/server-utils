import { hasSomeKinds } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import * as AA from '@duplojs/utils/array';
import * as CC from '@duplojs/utils/clean';
import { fileKind } from '../../dataParser/parsers/file.mjs';

function subjectToDataParser(contract) {
    if (hasSomeKinds(contract, [
        DDP.numberKind,
        DDP.bigIntKind,
        DDP.dateKind,
        DDP.timeKind,
        DDP.nilKind,
        fileKind,
    ])) {
        const clone = contract.clone();
        clone.definition.coerce = true;
        return clone;
    }
    else if (DDP.identifier(contract, DDP.arrayKind)) {
        return DDP.array(subjectToDataParser(contract.definition.element), contract.definition);
    }
    else if (DDP.identifier(contract, DDP.tupleKind)) {
        return DDP.tuple(AA.mapTuple(contract.definition.shape, (part) => subjectToDataParser(part)), {
            ...contract.definition,
            rest: contract.definition.rest
                ? subjectToDataParser(contract.definition.rest)
                : undefined,
        });
    }
    else if (contract instanceof Array) {
        return DDP.tuple(AA.mapTuple(contract, subjectToDataParser));
    }
    else if (hasSomeKinds(contract, [
        DDP.unionKind,
        DDP.pipeKind,
        DDP.optionalKind,
        DDP.literalKind,
        DDP.transformKind,
        DDP.templateLiteralKind,
        DDP.stringKind,
    ])) {
        return contract;
    }
    else {
        return CC.toMapDataParser(contract, { coerce: true });
    }
}
function isMultiSubject(subject) {
    return subject instanceof Array
        || hasSomeKinds(subject, [
            DDP.tupleKind,
            DDP.arrayKind,
            CC.entityPropertyArrayKind,
        ]);
}

export { isMultiSubject, subjectToDataParser };
