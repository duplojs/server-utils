---
outline: [2, 3]
prev:
  text: "mimeType"
  link: "/en/v0/api/file/mimeType"
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
  path: string | URL
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
  name: string;
  path: string;
  mimeType: SupportedMimeType | null;
  extension: SupportedExtensionFile | null;
  getParentPath(): string;
  rename(newName: string): Promise<FileSystemLeft | E.Success<FileInterface>>;
  exist(): Promise<FileSystemLeft | E.Ok>;
  relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FileInterface>>;
  remove(): Promise<FileSystemLeft | E.Ok>;
  stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
}
```

## Parameters

- `path` : path of the file.

## Return value

- `FileInterface` : interface with `name`, `extension`, `mimeType`, `path`, and methods like `rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `stat()`, and `getParentPath()`.

## See also

- [`stat`](/en/v0/api/file/stat) - Retrieves information about a path.
