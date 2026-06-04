Adds a file-size checker to an extended file parser.

The method returns a new parser that enforces optional minimum and maximum sizes expressed in bytes.

```ts
{@include dataParserExtended/file/size/example.ts[3,20]}
```

@remarks
This method adds an asynchronous checker and rejects missing resources or resources that are not regular files. Use `asyncParse` on the returned parser.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
