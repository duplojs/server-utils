Write an async byte stream to a file.

Consume an AsyncIterable of Uint8Array chunks and write them to the target path, returning ok/fail when the stream completes.

```ts
{@include file/writeStream/example.ts[4,30]}
```

@remarks
This is useful when data is already produced as chunks and should not be buffered into a single Uint8Array first.

@see https://server-utils.duplojs.dev/en/v0/api/file/writeStream
@namespace SF
