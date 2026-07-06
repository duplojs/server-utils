Creates an extended parser for `FileInterface` values.

Signature: `SDPE.file(definition?)` -> `DataParserFileExtended`

The parser accepts `FileInterface` values.
With `coerce: true`, string paths are also converted to `FileInterface`.
It exposes the chainable `mimeType`, `size`, and `exist` methods.

```ts
{@include dataParserExtended/file/example.ts[3,22]}
```

@remarks
- Parsed output is always `FileInterface`.
- `size` and `exist` add asynchronous checkers.
- The `definition` property stores the internal DataParser definition.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
