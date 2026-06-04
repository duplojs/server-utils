Adds an existing-file checker to an extended file parser.

The method returns a new parser that rejects missing resources and resources that are not regular files.

```ts
{@include dataParserExtended/file/exist/example.ts[3,16]}
```

@remarks
This method adds an asynchronous checker. Use `asyncParse` on the returned parser.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
