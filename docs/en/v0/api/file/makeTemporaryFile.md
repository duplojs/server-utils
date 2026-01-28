---
outline: [2, 3]
prev:
  text: "makeTemporaryDirectory"
  link: "/en/v0/api/file/makeTemporaryDirectory/"
next:
  text: "ensureFile"
  link: "/en/v0/api/file/ensureFile/"
description: "Creates a temporary file."
---

# makeTemporaryFile

Creates a temporary file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeTemporaryFile/main.ts-->
```

## Syntax

```typescript
function makeTemporaryFile(
  prefix: string,
  suffix?: string
): Promise<FileSystemLeft | E.Success<string>>
```

## Parameters

- `prefix` : prefix for the temporary file.
- `suffix` : optional suffix (e.g., extension).

## Return value

- `E.Success<string>` : path of the temporary file.
- `FileSystemLeft` : if creation fails.

## See also

- [`makeTemporaryDirectory`](/en/v0/api/file/makeTemporaryDirectory) - Creates a temporary directory.
