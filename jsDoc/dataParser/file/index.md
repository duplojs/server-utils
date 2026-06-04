Creates a data parser for `FileInterface` values.

The parser validates `FileInterface` inputs and supports path coercion through `SDP.coerce.file()`. File-specific constraints are composed with the `checkers` definition property or `.addChecker(...)`.

```ts
{@include dataParser/file/example.ts[3,23]}
```

@remarks
Use `asyncParse` when the parser contains asynchronous checkers such as `checkerFileExist` or `checkerFileSize`.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
