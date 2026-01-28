---
outline: [2, 3]
prev:
  text: "ensureDirectory"
  link: "/en/v0/api/file/ensureDirectory/"
next:
  text: "symlink"
  link: "/en/v0/api/file/symlink/"
description: "Walks a directory recursively."
---

# walkDirectory

Walks a directory recursively.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/walkDirectory/main.ts-->
```

## Syntax

```typescript
function walkDirectory(
  path: string | URL
): Promise<FileSystemLeft | E.Success<Generator<FileInterface | FolderInterface | UnknownInterface>>>
```

## Parameters

- `path` : path of the directory to walk.

## Return value

- `E.Success<Generator<...>>` : generator of file, directory, or unknown interfaces.
- `FileSystemLeft` : if the read fails.

## See also

- [`readDirectory`](/en/v0/api/file/readDirectory) - Lists the entries in a directory.
