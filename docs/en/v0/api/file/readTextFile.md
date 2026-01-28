---
outline: [2, 3]
prev:
  text: "readFile"
  link: "/en/v0/api/file/readFile/"
next:
  text: "writeFile"
  link: "/en/v0/api/file/writeFile/"
description: "Reads a text file and returns its content."
---

# readTextFile

Reads a text file and returns its content.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readTextFile/main.ts-->
```

## Syntax

```typescript
function readTextFile(
  path: string | URL
): Promise<FileSystemLeft | E.Success<string>>
```

## Parameters

- `path` : path of the file to read.

## Return value

- `E.Success<string>` : the file content.
- `FileSystemLeft` : if the read fails.

## See also

- [`readFile`](/en/v0/api/file/readFile) - Reads a binary file.
