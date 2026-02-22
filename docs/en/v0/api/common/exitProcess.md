---
outline: [2, 3]
description: "Stops the current process with an optional exit code."
prev:
  text: "getProcessArguments"
  link: "/en/v0/api/common/getProcessArguments"
next:
  text: "Common"
  link: "/en/v0/api/common/"
---

# exitProcess

Stops the current process with an optional exit code.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/exitProcess/main.ts-->
```

## Syntax

```typescript
function exitProcess(code?: number): void
```

## Parameters

- `code` (`number`, optional) : exit status code.

## Return value

- `void` : this function terminates the current process.

## See also

- [`getProcessArguments`](/en/v0/api/common/getProcessArguments) - Returns command-line arguments.
- [`environmentVariable`](/en/v0/api/common/environmentVariable) - Loads and validates environment variables.
