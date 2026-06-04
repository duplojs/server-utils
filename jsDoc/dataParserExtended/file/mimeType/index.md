Adds a MIME-type checker to an extended file parser.

The method returns a new parser that tests the MIME type inferred from the file extension against the provided regular expression.

```ts
{@include dataParserExtended/file/mimeType/example.ts[3,20]}
```

@remarks
When no MIME type can be inferred, the regular expression is tested against an empty string.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
