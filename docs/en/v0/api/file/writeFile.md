---
outline: [2, 3]
prev:
  text: "readTextFile"
  link: "/en/v0/api/file/readTextFile/"
next:
  text: "writeTextFile"
  link: "/en/v0/api/file/writeTextFile/"
description: "Writes binary content to a file."
---

# writeFile

Writes binary content to a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeFile/main.ts-->
```

## Syntax

```typescript
function writeFile(
  path: string | URL,
  data: Uint8Array
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : target file path.
- `data` : binary content to write.

## Return value

- `E.Ok` : if the write succeeds.
- `FileSystemLeft` : if the write fails.

## See also

- [`writeTextFile`](/en/v0/api/file/writeTextFile) - Writes text content.
