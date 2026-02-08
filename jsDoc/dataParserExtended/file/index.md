Build an extended file parser with chainable helpers.

This parser exposes fluent helpers such as `mimeType`, `minSize`, `maxSize`, and `mustExist` to compose constraints progressively.

```ts
{@include dataParserExtended/file/example.ts[3,19]}
```

@remarks
Methods `minSize`, `maxSize`, and `mustExist` enable checks that require `asyncParse`.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
