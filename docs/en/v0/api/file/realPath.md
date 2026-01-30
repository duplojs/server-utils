---
outline: [2, 3]
prev:
  text: "stat"
  link: "/en/v0/api/file/stat/"
next:
  text: "remove"
  link: "/en/v0/api/file/remove/"
description: "Resolves a path to its canonical form."
---

# realPath

Resolves a path to its canonical form.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/realPath/main.ts-->
```

## Syntax

```typescript
function realPath(
  path: string
): Promise<FileSystemLeft<"real-path"> | E.Success<string>>
```

## Parameters

- `path` : path to resolve.

## Return value

- `E.Success<string>` : resolved path.
- `FileSystemLeft<"real-path">` : if resolution fails.

## See also

- [`stat`](/en/v0/api/file/stat) - Retrieves information about a path.
