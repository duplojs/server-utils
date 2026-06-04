Creates a checker that validates a file MIME type.

The checker tests the MIME type inferred from the file extension against the provided regular expression.

```ts
{@include dataParser/file/checkers/mimeType/example.ts[3,19]}
```

@remarks
When no MIME type can be inferred, the regular expression is tested against an empty string.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
