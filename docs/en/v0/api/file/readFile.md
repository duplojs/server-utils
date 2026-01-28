---
outline: [2, 3]
prev:
  text: "File"
  link: "/en/v0/api/file/"
next:
  text: "readTextFile"
  link: "/en/v0/api/file/readTextFile/"
description: "Reads a file and returns its binary content."
---

# readFile

Reads a file and returns its binary content.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readFile/main.ts-->
```

## Syntax

```typescript
function readFile(
  path: string | URL
): Promise<FileSystemLeft | E.Success<Uint8Array>>
```

## Parameters

- `path` : path of the file to read.

## Return value

- `E.Success<Uint8Array>` : the file content.
- `FileSystemLeft` : if the read fails.

## See also

- [`readTextFile`](/en/v0/api/file/readTextFile) - Reads a text file.
