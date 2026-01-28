---
outline: [2, 3]
prev:
  text: "readDirectory"
  link: "/en/v0/api/file/readDirectory/"
next:
  text: "ensureDirectory"
  link: "/en/v0/api/file/ensureDirectory/"
description: "Creates a directory."
---

# makeDirectory

Creates a directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeDirectory/main.ts-->
```

## Syntax

```typescript
function makeDirectory(
  path: string | URL,
  params?: {
    recursive?: boolean
  }
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : path of the directory to create.
- `params.recursive` : also creates parent directories if `true`.

## Return value

- `E.Ok` : if creation succeeds.
- `FileSystemLeft` : if creation fails.

## See also

- [`ensureDirectory`](/en/v0/api/file/ensureDirectory) - Ensures a directory exists.
