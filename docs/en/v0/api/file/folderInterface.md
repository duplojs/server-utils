---
outline: [2, 3]
prev:
  text: "fileInterface"
  link: "/en/v0/api/file/fileInterface"
next:
  text: "unknownInterface"
  link: "/en/v0/api/file/unknownInterface"
description: "Directory interface with utility methods."
---

# folderInterface

Directory interface with utility methods.

::: warning
The `FolderInterface` object does not guarantee that the directory actually exists. It is only a helper to represent a resource and make operations easier.
:::

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createFolderInterface/main.ts-->
```

## Syntax

```typescript
function createFolderInterface(
  path: string | URL
): FolderInterface
```

```typescript
function isFolderInterface(
  input: unknown
): input is FolderInterface
```

### Interface FolderInterface

```typescript
interface FolderInterface {
  name: string;
  path: string;
  getParentPath(): string;
  rename(newName: string): Promise<FileSystemLeft | E.Success<FolderInterface>>;
  exist(): Promise<FileSystemLeft | E.Ok>;
  relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FolderInterface>>;
  remove(): Promise<FileSystemLeft | E.Ok>;
  getChildren(): Promise<FileSystemLeft | E.Success<string[]>>;
  stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
  walk(): Promise<FileSystemLeft | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
```

## Parameters

- `path` : path of the directory.

## Return value

- `FolderInterface` : interface with utility methods (`rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `getChildren()`, `stat()`, `walk()`, `getParentPath()`).

## See also

- [`fileInterface`](/en/v0/api/file/fileInterface) - Creates a file interface.
