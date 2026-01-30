---
outline: [2, 3]
prev:
  text: "makeDirectory"
  link: "/en/v0/api/file/makeDirectory/"
next:
  text: "walkDirectory"
  link: "/en/v0/api/file/walkDirectory/"
description: "Ensures a directory exists."
---

# ensureDirectory

Ensures a directory exists.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/ensureDirectory/main.ts-->
```

## Syntax

```typescript
function ensureDirectory(
  path: string
): Promise<FileSystemLeft<"ensure-directory"> | E.Ok>
```

## Parameters

- `path` : path of the directory to ensure.

## Return value

- `E.Ok` : if the directory exists or was created.
- `FileSystemLeft<"ensure-directory">` : if the operation fails.

## See also

- [`makeDirectory`](/en/v0/api/file/makeDirectory) - Creates a directory.
