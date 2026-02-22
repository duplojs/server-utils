---
outline: [2, 3]
description: "Returns the current working directory."
prev:
  text: "environmentVariable"
  link: "/en/v0/api/common/environmentVariable"
next:
  text: "setCurrentWorkingDirectory"
  link: "/en/v0/api/common/setCurrentWorkingDirectory"
---

# getCurrentWorkDirectory

Returns the current working directory.
This version returns an `Either` result.
If you prefer throwing behavior, use `getCurrentWorkDirectoryOrThrow`.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/main.ts-->
```

## Other examples

### Throw variant

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/otherExample.ts-->
```

## Syntax

```typescript
function getCurrentWorkDirectory(): E.Error<unknown> | E.Success<string>
```

## Parameters

This function takes no parameters.

## Return value

- `E.Success<string>` : the absolute path of the current directory.
- `E.Error<unknown>` : if reading the current directory fails.

## See also

- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.
