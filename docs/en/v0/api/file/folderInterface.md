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
  path: string
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
  path: string;
  getName(): string | null;
  getParentPath(): string | null;
  rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FolderInterface>>;
  relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FolderInterface>>;
  move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FolderInterface>>;
  exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
  remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
  getChildren(): Promise<FileSystemLeft<"read-directory"> | E.Success<string[]>>;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
  walk(): Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
```

## Parameters

- `path` : path of the directory.

## Return value

- `FolderInterface` : interface with getters (`getName`, `getParentPath`) and helper methods (`rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `getChildren()`, `stat()`, `walk()`).

## See also

- [`fileInterface`](/en/v0/api/file/fileInterface) - Creates a file interface.
