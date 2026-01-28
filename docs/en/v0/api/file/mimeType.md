---
outline: [2, 3]
prev:
  text: "ensureFile"
  link: "/en/v0/api/file/ensureFile"
next:
  text: "fileInterface"
  link: "/en/v0/api/file/fileInterface"
description: "MIME type and supported extension utilities."
---

# mimeType

MIME type and supported extension utilities.

::: warning
If you have extensions or MIME types that are not supported, you can override the `mimeType` `Map` to add them.
:::

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/mimeType/main.ts-->
```

## Export

### Map `mimeType`

`mimeType` is a `Map` that associates a file extension with a supported MIME type.

```typescript
const mimeType: Map<string, SupportedMimeType>;
```

### Function `isSupportedExtensionFile`

```typescript
function isSupportedExtensionFile(
  input: string
): input is SupportedExtensionFile
```

### Exported types

- `SupportedMimeType`
- `SupportedExtensionFile`

## Notes

- Extensions are without a dot (e.g., `"png"`). Some entries include a `"*"` prefix as defined in the database.

## See also

- [`fileInterface`](/en/v0/api/file/fileInterface) - Creates a file interface.
