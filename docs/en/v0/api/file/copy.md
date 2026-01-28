---
outline: [2, 3]
prev:
  text: "remove"
  link: "/en/v0/api/file/remove/"
next:
  text: "move"
  link: "/en/v0/api/file/move/"
description: "Copies a file or directory."
---

# copy

Copies a file or directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/copy/main.ts-->
```

## Syntax

```typescript
function copy(
  fromPath: string | URL,
  toPath: string | URL
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `fromPath` : source path.
- `toPath` : destination path.

## Return value

- `E.Ok` : if the copy succeeds.
- `FileSystemLeft` : if the copy fails.

## See also

- [`move`](/en/v0/api/file/move) - Moves a file or directory.
