Adds a MIME-type checker to an extended file parser.

The method returns a new parser that tests the MIME type inferred from the file extension against the provided input. A regular expression is used as-is, while a string or string tuple is converted to an exact-match regular expression.

```ts
{@include dataParserExtended/file/mimeType/example.ts[3,20]}
```

@remarks
String inputs are useful for strict MIME-type checks, and tuple inputs allow several strict values without writing an alternation regex. When no MIME type can be inferred, the resolved regular expression is tested against an empty string.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
