---
outline: [2, 3]
prev:
  text: "readTextFile"
  link: "/en/v0/api/file/readTextFile/"
next:
  text: "writeFile"
  link: "/en/v0/api/file/writeFile/"
description: "Reads a file as an async stream of binary chunks."
---

# readStream

Reads a file as an async stream of binary chunks.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readStream/main.ts-->
```

## Syntax

```typescript
function readStream(
  path: string
): AsyncGenerator<Uint8Array>
```

## Parameters

- `path` : path of the file to stream.

## Return value

- `AsyncGenerator<Uint8Array>` : an async generator yielding each file chunk as a `Uint8Array`.

## See also

- [`readFile`](/en/v0/api/file/readFile) - Reads the whole file into memory.
- [`writeStream`](/en/v0/api/file/writeStream) - Writes an async byte stream to a file.
