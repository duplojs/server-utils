---
outline: [2, 3]
description: "Cross-cutting helpers with no specific business use case. This namespace groups generic building blocks."
prev:
  text: "API Reference"
  link: "/en/v0/api/"
next:
  text: "File"
  link: "/en/v0/api/file/"
---

# Common

Cross-cutting helpers with no specific business use case. This namespace groups generic building blocks.

## How to import?

All functions are exported from the main entry or via direct import (tree-shaking friendly).

```typescript
import { getCurrentWorkDirectory } from "@duplojs/server-utils";
import { DServerCommon, SC } from "@duplojs/server-utils";
import * as DServerCommon from "@duplojs/server-utils/common";
import * as SC from "@duplojs/server-utils/common";
```

## Current directory

### [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory)
returns the current working directory for the active runtime.

### [`getCurrentWorkDirectoryOrThrow`](/en/v0/api/common/getCurrentWorkDirectoryOrThrow)
returns the current working directory or throws.

### [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory)
changes the current working directory from a path.
