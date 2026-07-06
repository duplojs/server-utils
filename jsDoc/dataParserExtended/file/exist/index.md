Adds an existing-file checker to an extended file parser.

Signature: `DataParserFileExtended.exist(definition?)` -> `DataParserFileExtended`

The method returns a new parser with an existing-file checker.
The checker passes when `FileInterface.stat()` returns an existing file.
It rejects missing resources and resources that are not files.

```ts
{@include dataParserExtended/file/exist/example.ts[3,16]}
```

@remarks
This method adds an asynchronous checker.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
