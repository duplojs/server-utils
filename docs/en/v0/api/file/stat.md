---
outline: [2, 3]
prev:
  text: "exists"
  link: "/en/v0/api/file/exists/"
next:
  text: "realPath"
  link: "/en/v0/api/file/realPath/"
description: "Retrieves information about a path."
---

# stat

Retrieves information about a path.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/stat/main.ts-->
```

## Syntax

```typescript
function stat(
  path: string | URL
): Promise<FileSystemLeft | E.Success<StatInfo>>
```

### Interface StatInfo

```typescript
interface StatInfo {
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
  sizeBytes: number;
  modifiedAt: D.TheDate | null;
  accessedAt: D.TheDate | null;
  createdAt: D.TheDate | null;
  changedAt: D.TheDate | null;
  deviceId: number;
  inode: number | null;
  permissionsMode: number | null;
  hardLinkCount: number | null;
  ownerUserId: number | null;
  ownerGroupId: number | null;
  specialDeviceId: number | null;
  ioBlockSize: number | null;
  allocatedBlockCount: number | null;
  isBlockDevice: boolean | null;
  isCharacterDevice: boolean | null;
  isFifo: boolean | null;
  isSocket: boolean | null;
}
```

## Parameters

- `path` : path to inspect.

## Return value

- `E.Success<StatInfo>` : information about the path (type, size, dates, etc.).
- `FileSystemLeft` : if the read fails.

## Notes

- `D.TheDate` is the date type provided by [`@duplojs/utils`](https://utils.duplojs.dev/en/v1/api/date/).

## See also

- [`exists`](/en/v0/api/file/exists) - Checks that a path exists.
