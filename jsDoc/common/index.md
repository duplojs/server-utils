Common utilities shared across runtimes.

**How to import:**
- From the main entry (namespace style)
- Via direct import for tree-shaking

```ts
import { getCurrentWorkDirectory } from "@duplojs/server-utils";
import * as DServerCommon from "@duplojs/server-utils/common";
import { getCurrentWorkDirectory } from "@duplojs/server-utils/common";
```

What you will find in this namespace:
- `environmentVariable`
- `getCurrentWorkDirectory`
- `setCurrentWorkingDirectory`
- `exitProcess`
- `getProcessArguments`

@see https://server-utils.duplojs.dev/en/v0/api/common
