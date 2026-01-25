import { mimeType, type SupportedExtensionFile } from "./database";

export function isSupportedExtensionFile(input: string): input is SupportedExtensionFile {
	return mimeType.has(input as SupportedExtensionFile);
}
