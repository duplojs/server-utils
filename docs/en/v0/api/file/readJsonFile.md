---
outline: [2, 3]
prev:
  text: "appendTextFile"
  link: "/en/v0/api/file/appendTextFile/"
next:
  text: "writeJsonFile"
  link: "/en/v0/api/file/writeJsonFile/"
description: "Reads and parses a JSON file."
---

# readJsonFile

Reads and parses a JSON file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readJsonFile/main.ts-->
```

## Syntax

```typescript
function readJsonFile<GenericOutput>(
  path: string | URL
): Promise<FileSystemLeft | E.Success<GenericOutput>>
```

## Parameters

- `path` : path of the JSON file.

## Return value

- `E.Success<GenericOutput>` : contenu JSON parse.
- `FileSystemLeft` : if reading or parsing fails.

## See also

- [`writeJsonFile`](/en/v0/api/file/writeJsonFile) - Writes a JSON object.
