---
outline: [2, 3]
prev:
  text: "appendFile"
  link: "/en/v0/api/file/appendFile/"
next:
  text: "readJsonFile"
  link: "/en/v0/api/file/readJsonFile/"
description: "Appends text content to the end of a file."
---

# appendTextFile

Appends text content to the end of a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/appendTextFile/main.ts-->
```

## Syntax

```typescript
function appendTextFile(
  path: string,
  data: string
): Promise<FileSystemLeft<"append-text-file"> | E.Ok>
```

## Parameters

- `path` : target file path.
- `data` : text content to append.

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft<"append-text-file">` : if the operation fails.

## See also

- [`appendFile`](/en/v0/api/file/appendFile) - Appends binary content.
