---
outline: [2, 3]
prev:
  text: "readJsonFile"
  link: "/en/v0/api/file/readJsonFile/"
next:
  text: "readDirectory"
  link: "/en/v0/api/file/readDirectory/"
description: "Serializes and writes JSON to a file."
---

# writeJsonFile

Serializes and writes JSON to a file.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeJsonFile/main.ts-->
```

## Syntax

```typescript
function writeJsonFile(
  path: string | URL,
  data: unknown,
  params?: {
    space?: number;
  }
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : path of the JSON file.
- `data` : data to serialize.
- `params.space` : JSON indentation (optional).

## Return value

- `E.Ok` : if the write succeeds.
- `FileSystemLeft` : if serialization or writing fails.

## Notes

- If `JSON.stringify` fails, the function returns a failure.

## See also

- [`readJsonFile`](/en/v0/api/file/readJsonFile) - Reads a JSON file.
