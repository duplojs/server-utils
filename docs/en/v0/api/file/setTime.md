---
outline: [2, 3]
prev:
  text: "setOwner"
  link: "/en/v0/api/file/setOwner/"
next:
  text: "makeTemporaryDirectory"
  link: "/en/v0/api/file/makeTemporaryDirectory/"
description: "Updates access and modification timestamps."
---

# setTime

Updates access and modification timestamps.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setTime/main.ts-->
```

## Syntax

```typescript
function setTime(
  path: string | URL,
  params: {
    accessTime: D.TheDate;
    modifiedTime: D.TheDate;
  }
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : target path.
- `params.accessTime` : access time.
- `params.modifiedTime` : date de modification.

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft` : if the operation fails.

## Notes

- `D.TheDate` is the date type provided by `@duplojs/utils`.

## See also

- [`setMode`](/en/v0/api/file/setMode) - Sets permissions for a file or directory.
