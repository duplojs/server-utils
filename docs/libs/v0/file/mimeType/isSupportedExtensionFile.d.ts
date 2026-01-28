import { type SupportedExtensionFile } from "./database";
/**
 * Check whether a file extension is supported.
 * 
 * Return true when the extension exists in the mime type database.
 * 
 * ```ts
 * const isSupported = SF.isSupportedExtensionFile("png");
 * // isSupported: boolean
 * 
 * const other = SF.isSupportedExtensionFile("unknown");
 * 
 * ```
 * 
 * @see https://server-utils.duplojs.dev/en/v0/api/file/mimeType
 * @namespace SF
 * 
 */
export declare function isSupportedExtensionFile(input: string): input is SupportedExtensionFile;
