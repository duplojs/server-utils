---
outline: [2, 3]
prev:
  text: "truncate"
  link: "/en/v0/api/file/truncate/"
next:
  text: "setOwner"
  link: "/en/v0/api/file/setOwner/"
description: "Sets permissions for a file or directory."
---

# setMode

Sets permissions for a file or directory.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setMode/main.ts-->
```

## Syntax

```typescript
function setMode(
  path: string,
  mode: ModeObject | number
): Promise<FileSystemLeft<"set-mode"> | E.Ok>
```

### ModeObject

```typescript
interface Permissions {
  read?: boolean;
  write?: boolean;
  exec?: boolean;
}

interface ModeObject {
  user?: Permissions;
  group?: Permissions;
  other?: Permissions;
  setUserId?: boolean;
  setGroupId?: boolean;
  sticky?: boolean;
}
```

## Parameters

- `path` : target path.
- `mode` : numeric mode (e.g., `0o644`) or permissions object.

## Return value

- `E.Ok` : if the operation succeeds.
- `FileSystemLeft<"set-mode">` : if the operation fails.

## Notes

- Object-form permissions are converted to numeric mode.

## See also

- [`setOwner`](/en/v0/api/file/setOwner) - Sets the owner of a file or directory.
