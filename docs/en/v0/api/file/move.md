---
outline: [2, 3]
prev:
  text: "copy"
  link: "/en/v0/api/file/copy/"
next:
  text: "rename"
  link: "/en/v0/api/file/rename/"
description: "Moves a file or directory."
---

# move

Moves a file or directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/move/main.ts-->
```

## Syntax

```typescript
function move(
  fromPath: string | URL,
  toPath: string | URL
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `fromPath` : source path.
- `toPath` : destination path.

## Return value

- `E.Ok` : if the move succeeds.
- `FileSystemLeft` : if the move fails.

## See also

- [`copy`](/en/v0/api/file/copy) - Copies a file or directory.
