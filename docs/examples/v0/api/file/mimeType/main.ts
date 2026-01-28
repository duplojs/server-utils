import { SF } from "@duplojs/server-utils";

const isSupported = SF.isSupportedExtensionFile("png");
// isSupported: boolean

const mime = SF.mimeType.get("png");
// mime: SF.SupportedMimeType | undefined
