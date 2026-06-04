Creates an extended data parser for `FileInterface` values.

The parser exposes the chainable `mimeType`, `size`, and `exist` methods to compose file-specific constraints.

```ts
{@include dataParserExtended/file/example.ts[3,22]}
```

@remarks
Use `asyncParse` after adding `size` or `exist`, because these methods add asynchronous checkers.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
