---
outline: [2, 3]
prev:
  text: "setTime"
  link: "/en/v0/api/file/setTime/"
next:
  text: "makeTemporaryFile"
  link: "/en/v0/api/file/makeTemporaryFile/"
description: "Creates a temporary directory."
---

# makeTemporaryDirectory

Creates a temporary directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeTemporaryDirectory/main.ts-->
```

## Syntax

```typescript
function makeTemporaryDirectory(
  prefix: string
): Promise<FileSystemLeft | E.Success<string>>
```

## Parameters

- `prefix` : prefix for the temporary directory.

## Return value

- `E.Success<string>` : path of the temporary directory.
- `FileSystemLeft` : if creation fails.

## See also

- [`makeTemporaryFile`](/en/v0/api/file/makeTemporaryFile) - Creates a temporary file.
