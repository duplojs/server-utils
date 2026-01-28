import { mimeType } from './database.mjs';

/**
 * {@include file/mimeType/isSupportedExtensionFile/index.md}
 */
function isSupportedExtensionFile(input) {
    return mimeType.has(input);
}

export { isSupportedExtensionFile };
