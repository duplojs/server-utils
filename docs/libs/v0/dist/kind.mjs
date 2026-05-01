import { createKindNamespace } from '@duplojs/utils';

const createDuplojsServerUtilsKind = createKindNamespace(
// @ts-expect-error reserved kind namespace
"DuplojsServerUtils");

export { createDuplojsServerUtilsKind };
