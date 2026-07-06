Creates a classic parser for `FileInterface` values.

Signature: `SDP.file(definition?)` -> `DataParserFile`

The parser accepts `FileInterface` values.
With `coerce: true`, string paths are also converted to `FileInterface`.
File checkers can be added with `checkers` or `.addChecker(...)`.

```ts
{@include dataParser/file/example.ts[3,23]}
```

@remarks
- Parsed output is always `FileInterface`.
- `checkerFileExist` and `checkerFileSize` make the parser asynchronous.
- The `definition` property stores the internal DataParser definition.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
