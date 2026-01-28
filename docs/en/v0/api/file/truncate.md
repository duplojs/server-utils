---
outline: [2, 3]
prev:
  text: "rename"
  link: "/en/v0/api/file/rename/"
next:
  text: "setMode"
  link: "/en/v0/api/file/setMode/"
description: "Reduces or extends a file to a given size."
---

# truncate

Reduces or extends a file to a given size.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/truncate/main.ts-->
```

## Syntax

```typescript
function truncate(
  path: string | URL,
  size?: number
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : path of the file.
- `size` : new size in bytes (optional).

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft` : if the operation fails.

## See also

- [`writeFile`](/en/v0/api/file/writeFile) - Writes binary content to a file.
