---
outline: [2, 3]
description: "CLI command utilities to compose command trees, parse options/subjects, render help, and execute handlers."
prev:
  text: "DataParser"
  link: "/en/v0/api/dataParser/"
next:
  text: "exec"
  link: "/en/v0/api/command/exec"
---

# Command

CLI command utilities to compose command trees, parse options/subjects, render help, and execute handlers.

## How to import?

The library exposes the `DServerCommand` and `SC` namespaces from the main entry **or** via direct import (tree-shaking friendly).

```typescript
import { DServerCommand, SC } from "@duplojs/server-utils";
import * as DServerCommand from "@duplojs/server-utils/command";
import * as SC from "@duplojs/server-utils/command";
```

## Entrypoint

### [`exec`](/en/v0/api/command/exec)
creates the root command, reads process arguments, and runs the command tree.

## Command builder

### [`create`](/en/v0/api/command/create)
creates a command with optional description, options, and subject.

## Option builders

### [`createBooleanOption`](/en/v0/api/command/createBooleanOption)
creates a flag option that returns `true` when present.

### [`createOption`](/en/v0/api/command/createOption)
creates an option with a single parsed value.

### [`createArrayOption`](/en/v0/api/command/createArrayOption)
creates an option that parses a delimited list of values.
