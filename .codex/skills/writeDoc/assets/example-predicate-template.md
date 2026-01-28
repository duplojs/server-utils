```ts
import { SF } from "@duplojs/server-utils";
import { type ExpectType } from "@duplojs/utils";

const extension = "txt" as "txt" | "not-support";

if (SF.isSupportedExtensionFile(extension)) {
	type check = ExpectType<
		typeof extension,
		"txt",
		"strict"
	>;
}
```
