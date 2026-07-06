Adds a MIME-type checker to an extended file parser.

Signature: `DataParserFileExtended.mimeType(mimeType, definition?)` -> `DataParserFileExtended`

The method returns a new parser with a MIME-type checker.
The checker passes when `FileInterface.getMimeType()` matches the `mimeType` pattern.
The MIME type comes from the file extension mapping, not from the file content.
A `RegExp` is used as-is; a string or string tuple is escaped and converted to an exact-match pattern.

```ts
{@include dataParserExtended/file/mimeType/example.ts[3,20]}
```

@remarks
When no MIME type can be inferred, the checker tests the regular expression against an empty string.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
