---
outline: [2, 3]
prev:
  text: "writeFile"
  link: "/en/v0/api/file/writeFile/"
next:
  text: "appendFile"
  link: "/en/v0/api/file/appendFile/"
description: "Writes text content to a file."
---

# writeTextFile

Writes text content to a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeTextFile/main.ts-->
```

## Syntax

```typescript
function writeTextFile(
  path: string,
  data: string
): Promise<FileSystemLeft<"write-text-file"> | E.Ok>
```

## Parameters

- `path` : target file path.
- `data` : text content to write.

## Return value

- `E.Ok` : if the write succeeds.
- `FileSystemLeft<"write-text-file">` : if the write fails.

## See also

- [`writeFile`](/en/v0/api/file/writeFile) - Writes binary content.
