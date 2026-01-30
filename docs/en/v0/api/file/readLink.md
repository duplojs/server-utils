---
outline: [2, 3]
prev:
  text: "symlink"
  link: "/en/v0/api/file/symlink/"
next:
  text: "link"
  link: "/en/v0/api/file/link/"
description: "Reads the target of a symbolic link."
---

# readLink

Reads the target of a symbolic link.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readLink/main.ts-->
```

## Syntax

```typescript
function readLink(
  path: string
): Promise<FileSystemLeft<"read-link"> | E.Success<string>>
```

## Parameters

- `path` : path of the link.

## Return value

- `E.Success<string>` : link target path.
- `FileSystemLeft<"read-link">` : if the read fails.

## See also

- [`symlink`](/en/v0/api/file/symlink) - Creates a symbolic link.
