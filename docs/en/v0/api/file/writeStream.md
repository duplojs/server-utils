---
outline: [2, 3]
prev:
  text: "writeTextFile"
  link: "/en/v0/api/file/writeTextFile/"
next:
  text: "appendFile"
  link: "/en/v0/api/file/appendFile/"
description: "Writes an async stream of binary chunks to a file."
---

# writeStream

Writes an async stream of binary chunks to a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeStream/main.ts-->
```

## Syntax

```typescript
function writeStream(
  path: string,
  source: AsyncIterable<Uint8Array>
): Promise<FileSystemLeft<"write-stream"> | E.Ok>
```

## Parameters

- `path` : target file path.
- `source` : async iterable producing the chunks to write.

## Return value

- `E.Ok` : if the write succeeds.
- `FileSystemLeft<"write-stream">` : if the write fails.

## See also

- [`readStream`](/en/v0/api/file/readStream) - Reads a file as an async byte stream.
- [`writeFile`](/en/v0/api/file/writeFile) - Writes a full binary buffer at once.
