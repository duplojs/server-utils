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
import * as DServerCommon from "@duplojs/server-utils/common";
```

## Environment variables

### [`environmentVariable`](/en/v0/api/common/environmentVariable)
loads env variables from runtime and optional files, validates them, and returns an Either result. Throw variant available: `environmentVariableOrThrow`.

## Current directory

### [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory)
returns the current working directory for the active runtime. Throw variant available: `getCurrentWorkDirectoryOrThrow`.

### [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory)
changes the current working directory to a target directory.

## Process

### [`getProcessArguments`](/en/v0/api/common/getProcessArguments)
returns process arguments provided from the command line.

### [`exitProcess`](/en/v0/api/common/exitProcess)
stops the current process with an optional exit code.
