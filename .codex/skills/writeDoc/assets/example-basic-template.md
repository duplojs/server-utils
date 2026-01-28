```ts
import { SF } from "@duplojs/server-utils";

const result = await SF.readTextFile("/tmp/file.bin");
// result: E.Success<string> | SF.FileSystemLeft
```
