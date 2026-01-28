---
outline: [2, 3]
prev:
  text: "writeJsonFile"
  link: "/en/v0/api/file/writeJsonFile/"
next:
  text: "makeDirectory"
  link: "/en/v0/api/file/makeDirectory/"
description: "Lists the entries in a directory."
---

# readDirectory

Lists the entries in a directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readDirectory/main.ts-->
```

## Syntax

```typescript
function readDirectory(
  path: string | URL,
  params?: {
    recursive?: true
  }
): Promise<FileSystemLeft | E.Success<string[]>>
```

## Parameters

- `path` : path of the directory to list.
- `params.recursive` : also lists subdirectories if `true`.

## Return value

- `E.Success<string[]>` : list of entries.
- `FileSystemLeft` : if the read fails.

## See also

- [`makeDirectory`](/en/v0/api/file/makeDirectory) - Creates a directory.
