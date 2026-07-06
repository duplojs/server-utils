Adds a file-size checker to an extended file parser.

Signature: `DataParserFileExtended.size(input, definition?)` -> `DataParserFileExtended`

The method returns a new parser with a file-size checker.
The checker passes when `FileInterface.stat()` returns a file and `sizeBytes` is inside the given bounds.
`min` and `max` are inclusive.
Numbers are bytes.
String values such as `"10kb"`, `"2mb"`, or `"1.5gb"` are converted with base 1024 and rounded down to bytes.

```ts
{@include dataParserExtended/file/size/example.ts[3,20]}
```

@remarks
This method adds an asynchronous checker.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDPE
