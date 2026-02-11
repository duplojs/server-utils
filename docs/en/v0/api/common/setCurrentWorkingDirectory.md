---
outline: [2, 3]
description: "Changes the current working directory."
prev:
  text: "getCurrentWorkDirectoryOrThrow"
  link: "/en/v0/api/common/getCurrentWorkDirectoryOrThrow"
next:
  text: "environmentVariable"
  link: "/en/v0/api/common/environmentVariable"
---

# setCurrentWorkingDirectory

Changes the current working directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/setCurrentWorkingDirectory/main.ts-->
```

## Syntax

```typescript
function setCurrentWorkingDirectory(
  path: string
): E.Fail | E.Ok
```

## Parameters

- `path` (`string`) : target path.

## Return value

- `E.Ok` : if the directory change succeeded.
- `E.Fail` : if the directory change failed.

## See also

- [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory) - Returns the current working directory.
- [`environmentVariable`](/en/v0/api/common/environmentVariable) - Loads and validates environment variables.
