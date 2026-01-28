import { mimeType, type SupportedExtensionFile } from "./database";

/**
 * {@include file/mimeType/isSupportedExtensionFile/index.md}
 */
export function isSupportedExtensionFile(input: string): input is SupportedExtensionFile {
	return mimeType.has(input as SupportedExtensionFile);
}
