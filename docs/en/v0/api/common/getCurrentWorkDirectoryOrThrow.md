---
outline: [2, 3]
prev:
  text: "getCurrentWorkDirectory"
  link: "/en/v0/api/common/getCurrentWorkDirectory"
next:
  text: "setCurrentWorkingDirectory"
  link: "/en/v0/api/common/setCurrentWorkingDirectory"
description: "Returns the current working directory or throws."
---

# getCurrentWorkDirectoryOrThrow

Returns the current working directory or throws.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectoryOrThrow/main.ts-->
```

## Syntax

```typescript
function getCurrentWorkDirectoryOrThrow(): string
```

## Parameters

This function takes no parameters.

## Return value

- `string` : the absolute path of the current directory.

## See also

- [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory) - Returns the current working directory.
- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.
