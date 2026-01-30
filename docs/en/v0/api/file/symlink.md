---
outline: [2, 3]
prev:
  text: "walkDirectory"
  link: "/en/v0/api/file/walkDirectory/"
next:
  text: "readLink"
  link: "/en/v0/api/file/readLink/"
description: "Creates a symbolic link."
---

# symlink

Creates a symbolic link.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/symlink/main.ts-->
```

## Syntax

```typescript
function symlink(
  oldPath: string,
  newPath: string,
  params?: {
    type: "file" | "dir" | "junction";
  }
): Promise<FileSystemLeft<"symlink"> | E.Ok>
```

## Parameters

- `oldPath` : link target path.
- `newPath` : path of the link to create.
- `params.type` : link type (Windows only).

## Return value

- `E.Ok` : if creation succeeds.
- `FileSystemLeft<"symlink">` : if creation fails.

## Notes

- On Windows, `type` can be `"file"`, `"dir"`, or `"junction"`.

## See also

- [`readLink`](/en/v0/api/file/readLink) - Reads the target of a symbolic link.
- [`link`](/en/v0/api/file/link) - Creates a hard link.
