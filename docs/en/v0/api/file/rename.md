---
outline: [2, 3]
prev:
  text: "move"
  link: "/en/v0/api/file/move/"
next:
  text: "truncate"
  link: "/en/v0/api/file/truncate/"
description: "Renames a file or directory within its parent directory."
---

# rename

Renames a file or directory within its parent directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/rename/main.ts-->
```

## Syntax

```typescript
function rename(
  path: string | URL,
  newName: string
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : path to rename.
- `newName` : new name (without path).

## Return value

- `E.Ok` : if renaming succeeds.
- `FileSystemLeft` : if renaming fails.

## See also

- [`move`](/en/v0/api/file/move) - Moves a file or directory.
