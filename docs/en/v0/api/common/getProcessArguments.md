---
outline: [2, 3]
description: "Returns the process arguments passed from the command line."
prev:
  text: "setCurrentWorkingDirectory"
  link: "/en/v0/api/common/setCurrentWorkingDirectory"
next:
  text: "exitProcess"
  link: "/en/v0/api/common/exitProcess"
---

# getProcessArguments

Returns the process arguments passed from the command line.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getProcessArguments/main.ts-->
```

## Syntax

```typescript
function getProcessArguments(): string[]
```

## Parameters

This function takes no parameters.

## Return value

- `string[]` : command-line arguments after the executable/script part.

## See also

- [`exitProcess`](/en/v0/api/common/exitProcess) - Stops the current process with an optional status code.
- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.
