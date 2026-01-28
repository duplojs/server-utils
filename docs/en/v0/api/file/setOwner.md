---
outline: [2, 3]
prev:
  text: "setMode"
  link: "/en/v0/api/file/setMode/"
next:
  text: "setTime"
  link: "/en/v0/api/file/setTime/"
description: "Sets the owner of a file or directory."
---

# setOwner

Sets the owner of a file or directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setOwner/main.ts-->
```

## Syntax

```typescript
function setOwner(
  path: string | URL,
  params: {
    userId: number;
    groupId: number;
  }
): Promise<FileSystemLeft | E.Ok>
```

## Parameters

- `path` : target path.
- `params.userId` : identifiant utilisateur.
- `params.groupId` : identifiant groupe.

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft` : if the operation fails.

## See also

- [`setMode`](/en/v0/api/file/setMode) - Sets permissions for a file or directory.
