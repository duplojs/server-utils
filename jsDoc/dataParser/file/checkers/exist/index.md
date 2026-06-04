Creates a checker that requires an existing regular file.

The checker reads the file statistics and rejects missing resources and resources that are not files.

```ts
{@include dataParser/file/checkers/exist/example.ts[3,22]}
```

@remarks
This checker is asynchronous. Use `asyncParse` on parsers that contain it.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
