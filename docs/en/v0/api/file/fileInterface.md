---
outline: [2, 3]
prev:
  text: "ensureFile"
  link: "/en/v0/api/file/ensureFile"
next:
  text: "folderInterface"
  link: "/en/v0/api/file/folderInterface"
description: "File interface with utility methods."
---

# fileInterface

File interface with utility methods.

::: warning
The `FileInterface` object does not guarantee that the file actually exists. It is only a helper to represent a resource and make operations easier.
:::

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createFileInterface/main.ts-->
```

## Syntax

```typescript
function createFileInterface(
  path: string
): FileInterface
```

```typescript
function isFileInterface(
  input: unknown
): input is FileInterface
```

### Interface FileInterface

```typescript
interface FileInterface {
  path: string;
  getName(): string | null;
  getMimeType(): string | null;
  getExtension(): string | null;
  getParentPath(): string | null;
  rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FileInterface>>;
  relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FileInterface>>;
  move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FileInterface>>;
  exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
  remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
}
```

## Parameters

- `path` : path of the file.

## Return value

- `FileInterface` : interface with `path`, getters (`getName`, `getExtension`, `getMimeType`, `getParentPath`) and helper methods like `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, and `stat()`.

## See also

- [`stat`](/en/v0/api/file/stat) - Retrieves information about a path.
