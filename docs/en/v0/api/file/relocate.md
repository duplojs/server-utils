---
outline: [2, 3]
prev:
  text: "move"
  link: "/en/v0/api/file/move/"
next:
  text: "rename"
  link: "/en/v0/api/file/rename/"
description: "Relocates a path into a new parent directory."
---

# relocate

Relocates a path into a new parent directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/relocate/main.ts-->
```

## Syntax

```typescript
function relocate(
  fromPath: string,
  newParentPath: string
): Promise<FileSystemLeft<"relocate"> | E.Success<string>>
```

## Parameters

- `fromPath` : path to relocate.
- `newParentPath` : destination parent directory.

## Return value

- `E.Success<string>` : the new path when relocation succeeds.
- `FileSystemLeft<"relocate">` : if relocation fails.

## See also

- [`move`](/en/v0/api/file/move) - Moves a file or directory.
- [`rename`](/en/v0/api/file/rename) - Renames a file or directory within its parent directory.
