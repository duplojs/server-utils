import type * as AllServerDataParser from "./parsers";
import type * as AllServerDataParserExtended from "./extended/file";

declare module "@duplojs/utils/dataParser" {
	interface DataParserCustom {
		file: AllServerDataParser.DataParserFile;
	}

	interface DataParserExtendedCustom {
		file: AllServerDataParserExtended.DataParserFileExtended;
	}
}
