import { createKindNamespace } from '@duplojs/utils';

const createDataParserKind = createKindNamespace(
// @ts-expect-error reserved kind namespace
"DuplojsServerUtilsDataParser");

export { createDataParserKind };
