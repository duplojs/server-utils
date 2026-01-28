---
outline: [2, 3]
prev:
  text: "readLink"
  link: "/en/v0/api/file/readLink/"
next:
  text: "linkStat"
  link: "/en/v0/api/file/linkStat/"
description: "Creates a hard link."
---

# link

Creates a hard link.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/link/main.ts-->
```

## Syntax

```typescript
function link(
  existingPath: string | URL,
  newPath: string | URL
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `existingPath` : path of the source resource.
- `newPath` : path of the link to create.

## Return value

- `E.Ok` : if creation succeeds.
- `FileSystemLeft` : if creation fails.

## See also

- [`symlink`](/en/v0/api/file/symlink) - Creates a symbolic link.
