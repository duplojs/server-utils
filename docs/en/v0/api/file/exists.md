---
outline: [2, 3]
prev:
  text: "linkStat"
  link: "/en/v0/api/file/linkStat/"
next:
  text: "stat"
  link: "/en/v0/api/file/stat/"
description: "Checks that a path exists."
---

# exists

Checks that a path exists.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/exists/main.ts-->
```

## Syntax

```typescript
function exists(
  path: string
): Promise<FileSystemLeft<"exists"> | E.Ok>
```

## Parameters

- `path` : path to check.

## Return value

- `E.Ok` : if the path exists.
- `FileSystemLeft<"exists">` : if the path does not exist or if the check fails.

## See also

- [`stat`](/en/v0/api/file/stat) - Retrieves information about a path.
