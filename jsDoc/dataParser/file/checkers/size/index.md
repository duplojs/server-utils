Creates a checker that validates the size of an existing file.

The checker reads the file statistics and enforces optional minimum and maximum sizes. Limits can be expressed as bytes with numbers or as byte strings such as `"10kb"`, `"2mb"`, or `"1.5gb"`.

```ts
{@include dataParser/file/checkers/size/example.ts[3,24]}
```

@remarks
This checker is asynchronous and also rejects missing resources or resources that are not files. Use `asyncParse` on parsers that contain it.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
