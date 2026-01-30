---
outline: [2, 3]
prev:
  text: "relocate"
  link: "/en/v0/api/file/relocate/"
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
  path: string,
  newName: string
): Promise<FileSystemLeft<"rename"> | E.Success<string>>
```

## Parameters

- `path` : path to rename.
- `newName` : new name (without path).

## Return value

- `E.Success<string>` : the new path when renaming succeeds.
- `FileSystemLeft<"rename">` : if renaming fails.

## See also

- [`move`](/en/v0/api/file/move) - Moves a file or directory.
