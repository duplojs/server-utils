---
outline: [2, 3]
prev:
  text: "realPath"
  link: "/en/v0/api/file/realPath/"
next:
  text: "copy"
  link: "/en/v0/api/file/copy/"
description: "Removes a file or directory."
---

# remove

Removes a file or directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/remove/main.ts-->
```

## Syntax

```typescript
function remove(
  path: string,
  params?: {
    recursive?: boolean
  }
): Promise<FileSystemLeft<"remove"> | E.Ok>
```

## Parameters

- `path` : path to remove.
- `params.recursive` : removes a non-empty directory if `true`.

## Return value

- `E.Ok` : if removal succeeds.
- `FileSystemLeft<"remove">` : if removal fails.

## See also

- [`copy`](/en/v0/api/file/copy) - Copies a file or directory.
