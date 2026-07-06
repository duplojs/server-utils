Creates a checker that validates the size of an existing file.

Signature: `checkerFileSize(input, definition?)` -> `DataParserCheckerFileSize`

The checker passes when `FileInterface.stat()` returns a file and `sizeBytes` is inside the given bounds.
`min` and `max` are inclusive.
Numbers are bytes.
String values such as `"10kb"`, `"2mb"`, or `"1.5gb"` are converted with base 1024 and rounded down to bytes.

```ts
{@include dataParser/file/checkers/size/example.ts[3,24]}
```

@remarks
This checker is asynchronous.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
