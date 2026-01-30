---
outline: [2, 3]
prev:
  text: "folderInterface"
  link: "/en/v0/api/file/folderInterface"
next:
  text: "API Reference"
  link: "/en/v0/api/"
description: "Interface for a path of unknown type."
---

# unknownInterface

Interface for a path of unknown type.

::: warning
The `UnknownInterface` object does not guarantee that the path actually exists. It is only a helper to represent a resource and make operations easier.
:::

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createUnknownInterface/main.ts-->
```

## Syntax

```typescript
function createUnknownInterface(
  path: string
): UnknownInterface
```

```typescript
function isUnknownInterface(
  input: unknown
): input is UnknownInterface
```

### Interface UnknownInterface

```typescript
interface UnknownInterface {
  path: string;
  getName(): string | null;
  getParentPath(): string | null;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
  exist(): Promise<FileSystemLeft<"exists"> | E.Ok>;
}
```

## Parameters

- `path` : resource path.

## Return value

- `UnknownInterface` : interface with getters (`getName`, `getParentPath`) and utility methods (`exist`, `stat`).

## See also

- [`folderInterface`](/en/v0/api/file/folderInterface) - Creates a directory interface.
