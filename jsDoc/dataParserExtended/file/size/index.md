Adds a file-size checker to an extended file parser.

The method returns a new parser that enforces optional minimum and maximum sizes. Limits can be expressed as bytes with numbers or as byte strings such as `"10kb"`, `"2mb"`, or `"1.5gb"`.

```ts
{@include dataParserExtended/file/size/example.ts[3,20]}
```

@remarks
This method adds an asynchronous checker and rejects missing resources or resources that are not regular files. Use `asyncParse` on the returned parser.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
