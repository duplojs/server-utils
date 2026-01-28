File system utilities for common read/write and path operations.

**How to import:**
- From the main entry (namespace style)
- Via direct import for tree-shaking

```ts
import { DServerFile, SF } from "@duplojs/server-utils";
import * as DServerFile from "@duplojs/server-utils/file";
import * as SF from "@duplojs/server-utils/file";
```

What you will find in this namespace:
- Read/write: `readFile`, `readTextFile`, `writeFile`, `writeTextFile`, `appendFile`, `appendTextFile`
- JSON: `readJsonFile`, `writeJsonFile`
- Directory: `readDirectory`, `makeDirectory`, `ensureDirectory`, `walkDirectory`
- Move/copy/remove: `copy`, `move`, `rename`, `remove`, `truncate`
- Links: `symlink`, `readLink`, `link`, `linkStat`
- Metadata: `exists`, `stat`, `realPath`, `setMode`, `setOwner`, `setTime`
- Helpers: `ensureFile`, `makeTemporaryDirectory`, `makeTemporaryFile`
- Interfaces: `createFileInterface`, `createFolderInterface`, `createUnknownInterface`

@see https://server-utils.duplojs.dev/en/v0/api/file

@namespace SF
