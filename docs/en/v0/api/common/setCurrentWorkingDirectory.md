---
outline: [2, 3]
description: "Changes the current working directory."
prev:
  text: "getCurrentWorkDirectory"
  link: "/en/v0/api/common/getCurrentWorkDirectory"
next:
  text: "Common"
  link: "/en/v0/api/common/"
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
  path: string | URL
): E.Fail | E.Ok
```

## Parameters

- `path` (`string | URL`) : target path. If a `URL` is provided, it is decoded to a file path.

## Return value

- `E.Ok` : if the directory change succeeded.
- `E.Fail` : if the directory change failed.

## See also

- [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory) - Returns the current working directory.
