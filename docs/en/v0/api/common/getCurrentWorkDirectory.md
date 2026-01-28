---
outline: [2, 3]
description: "Returns the current working directory."
prev:
  text: "Common"
  link: "/en/v0/api/common/"
next:
  text: "setCurrentWorkingDirectory"
  link: "/en/v0/api/common/setCurrentWorkingDirectory"
---

# getCurrentWorkDirectory

Returns the current working directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/main.ts-->
```

## Syntax

```typescript
function getCurrentWorkDirectory(): E.Fail | E.Success<string>
```

## Parameters

This function takes no parameters.

## Return value

- `E.Success<string>` : the absolute path of the current directory.
- `E.Fail` : if reading the current directory fails.

## See also

- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.