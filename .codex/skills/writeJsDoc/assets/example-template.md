```ts
import { SF, pipe } from "@scripts";

N.functionName(
	"input",
	"value",
); // "result"

pipe(
	"input",
	N.functionName("value"),
); // "result"

const other = SF.functionName(
	"another",
	"value",
); // "result"
```
