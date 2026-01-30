---
outline: [2, 3]
prev:
  text: "makeTemporaryFile"
  link: "/en/v0/api/file/makeTemporaryFile/"
next:
  text: "fileInterface"
  link: "/en/v0/api/file/fileInterface/"
description: "Ensures a file exists."
---

# ensureFile

Ensures a file exists.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/ensureFile/main.ts-->
```

## Syntax

```typescript
function ensureFile(
  path: string
): Promise<FileSystemLeft<"ensure-file"> | E.Ok>
```

## Parameters

- `path` : path of the file.

## Return value

- `E.Ok` : if the file exists or was created.
- `FileSystemLeft<"ensure-file">` : if the operation fails.

## See also

- [`ensureDirectory`](/en/v0/api/file/ensureDirectory) - Ensures a directory exists.
