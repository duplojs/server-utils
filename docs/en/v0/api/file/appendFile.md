---
outline: [2, 3]
prev:
  text: "writeTextFile"
  link: "/en/v0/api/file/writeTextFile/"
next:
  text: "appendTextFile"
  link: "/en/v0/api/file/appendTextFile/"
description: "Appends binary content to the end of a file."
---

# appendFile

Appends binary content to the end of a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/appendFile/main.ts-->
```

## Syntax

```typescript
function appendFile(
  path: string,
  data: Uint8Array
): Promise<FileSystemLeft<"append-file"> | E.Ok>
```

## Parameters

- `path` : target file path.
- `data` : binary content to append.

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft<"append-file">` : if the operation fails.

## See also

- [`appendTextFile`](/en/v0/api/file/appendTextFile) - Appends text content.
