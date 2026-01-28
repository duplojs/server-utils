---
outline: [2, 3]
prev:
  text: "link"
  link: "/en/v0/api/file/link/"
next:
  text: "exists"
  link: "/en/v0/api/file/exists/"
description: "Retrieves information about a symbolic link."
---

# linkStat

Retrieves information about a symbolic link (the link itself, not the target).

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/linkStat/main.ts-->
```

## Syntax

```typescript
function linkStat(
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

- `path` : path of the link to inspect.

## Return value

- `E.Success<StatInfo>` : information about the link.
- `FileSystemLeft` : if the read fails.

## Notes

- `D.TheDate` is the date type provided by [`@duplojs/utils`](https://utils.duplojs.dev/en/v1/api/date/).

## See also

- [`stat`](/en/v0/api/file/stat) - Retrieves information about a path.
